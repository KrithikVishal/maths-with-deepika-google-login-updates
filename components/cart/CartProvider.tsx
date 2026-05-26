"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, Product, StoredOrder } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  lastAdded?: string;
  orders: StoredOrder[];
  createOrder: (order: Omit<StoredOrder, "id" | "createdAt" | "status">, id?: string) => StoredOrder;
  updateOrder: (id: string, updates: Pick<Partial<StoredOrder>, "status" | "trackingId">) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "vedic-maths-cart";
const ORDERS_KEY = "vedic-maths-orders";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [lastAdded, setLastAdded] = useState<string>();

  useEffect(() => {
    setItems(readJson<CartItem[]>(CART_KEY, []));
    setOrders(readJson<StoredOrder[]>(ORDERS_KEY, []));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count,
    subtotal,
    lastAdded,
    orders,
    addItem(product) {
      if (product.stock <= 0) return;
      setItems((current) => {
        const found = current.find((item) => item.id === product.id);
        if (found) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
              : item,
          );
        }
        return [...current, { ...product, quantity: 1 }];
      });
      setLastAdded(product.id);
      window.setTimeout(() => setLastAdded(undefined), 1800);
    },
    increase(id) {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item,
        ),
      );
    },
    decrease(id) {
      setItems((current) =>
        current
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      );
    },
    remove(id) {
      setItems((current) => current.filter((item) => item.id !== id));
    },
    clear() {
      setItems([]);
    },
    createOrder(order, id) {
      const newOrder: StoredOrder = {
        ...order,
        id: id ?? `VM-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        status: "Placed",
      };
      setOrders((current) => [newOrder, ...current]);
      setItems([]);
      return newOrder;
    },
    updateOrder(id, updates) {
      setOrders((current) => current.map((order) => (order.id === id ? { ...order, ...updates } : order)));
    },
  }), [count, items, lastAdded, orders, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }
  return context;
}

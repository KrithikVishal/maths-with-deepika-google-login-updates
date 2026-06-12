import "server-only";

import { CartItem, OrderStatus, PaymentStatus, StoredOrder } from "@/lib/types";

type OrderItemRow = {
  product_id: string;
  variant_id?: string | null;
  product_name: string;
  variant_name?: string | null;
  price: number;
  quantity: number;
  total?: number;
};

export type OrderRow = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string | null;
  status: OrderStatus;
  order_status?: string | null;
  payment_status?: PaymentStatus | null;
  tracking_id: string | null;
  courier_name?: string | null;
  tracking_url?: string | null;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  order_items: OrderItemRow[];
};

export function getTrackingUrl(courierName?: string | null, trackingId?: string | null, trackingUrl?: string | null) {
  if (trackingUrl) return trackingUrl;
  if (trackingId && courierName?.toLowerCase() === "delhivery") {
    return `https://www.delhivery.com/track/package/${trackingId}`;
  }
  return undefined;
}

function normalizeOrderStatus(row: OrderRow): OrderStatus {
  const status = row.order_status ?? row.status;
  const title = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Placed";
  if (["Placed", "Packed", "Shipped", "Delivered", "Cancelled"].includes(title)) return title as OrderStatus;
  return row.status;
}

export function mapOrderRow(row: OrderRow): StoredOrder {
  return {
    id: row.id,
    createdAt: row.created_at,
    status: normalizeOrderStatus(row),
    paymentStatus: row.payment_status ?? "pending",
    trackingId: row.tracking_id ?? undefined,
    courierName: row.courier_name ?? undefined,
    trackingUrl: getTrackingUrl(row.courier_name, row.tracking_id, row.tracking_url),
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    total: Number(row.total),
    customer: {
      fullName: row.customer_name,
      email: row.customer_email,
      phone: row.customer_phone,
      address: row.shipping_address,
      city: row.city,
      state: row.state,
      pincode: row.pincode,
      notes: row.notes ?? undefined,
    },
    items: row.order_items.map((item): CartItem => ({
      id: item.product_id,
      variantId: item.variant_id ?? undefined,
      name: item.product_name,
      variantName: item.variant_name ?? undefined,
      price: Number(item.price),
      priceLabel: `₹${Number(item.price).toLocaleString("en-IN")}`,
      status: "Purchased",
      stock: 999,
      quantity: item.quantity,
    })),
  };
}

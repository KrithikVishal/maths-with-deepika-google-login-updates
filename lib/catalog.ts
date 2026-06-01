import type { Product } from "@/lib/types";

export const checkoutCatalog: Product[] = [
  { id: "practice-book", name: "Vedic Maths Practice Book", price: 699, priceLabel: "INR 699", status: "In stock", stock: 24, image: "book" },
  { id: "flash-cards", name: "Flash Cards", price: 399, priceLabel: "INR 399", status: "In stock", stock: 18, image: "cards" },
  { id: "kids-learning-kit", name: "Kids Learning Kit", price: 1299, priceLabel: "INR 1,299", status: "Few left", stock: 4, image: "kit" },
  { id: "activity-worksheets-bundle", name: "Activity Worksheets Bundle", price: 549, priceLabel: "INR 549", status: "Out of Stock", stock: 0, image: "bundle" },
  { id: "razorpay-test-product-1inr", name: "Razorpay Test Product", price: 1, priceLabel: "INR 1", status: "In stock", stock: 100 },
  { id: "jolly-maths-pack-1-book", name: "Jolly Maths Pack - Any 1 Book", price: 799, priceLabel: "INR 799", status: "In stock", stock: 40 },
  { id: "jolly-maths-pack-2-books", name: "Jolly Maths Pack - Any 2 Books", price: 1499, priceLabel: "INR 1,499", status: "In stock", stock: 40 },
  { id: "jolly-maths-pack-3-books", name: "Jolly Maths Pack - Any 3 Books", price: 2199, priceLabel: "INR 2,199", status: "In stock", stock: 40 },
  { id: "jolly-maths-pack-4-books", name: "Jolly Maths Pack - Any 4 Books", price: 2799, priceLabel: "INR 2,799", status: "In stock", stock: 40 },
];

export function findCheckoutProduct(productId: string, variantId?: string | null) {
  if (productId.startsWith("bootcamp-")) {
    return {
      id: productId,
      name: "Bootcamp Course",
      price: 499,
      priceLabel: "INR 499",
      status: "In stock",
      stock: 100,
      productType: "course" as const,
    };
  }
  return checkoutCatalog.find((product) => product.id === productId && (product.variantId ?? null) === (variantId ?? null));
}


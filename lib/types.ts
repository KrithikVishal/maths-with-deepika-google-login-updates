export type UserRole = "admin" | "mother" | "kid";
export type UserStatus = "active" | "inactive";
export type AccessLevel = "none" | "partial" | "full";
export type CourseAudience = "mother" | "kid";
export type CourseType = "program" | "topic";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  username: string | null;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  access_level?: AccessLevel;
  created_at: string;
  updated_at: string;
};

export type ProductType = "physical" | "digital" | "course";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type Product = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  status: string;
  stock: number;
  image?: string;
  productType?: ProductType;
  variantId?: string;
  variantName?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type OrderStatus = "Placed" | "Packed" | "Shipped" | "Delivered" | "Cancelled";

export type StoredOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes?: string;
  };
  trackingId?: string;
  courierName?: string;
  trackingUrl?: string;
};

export const roleDashboard: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  mother: "/mother/dashboard",
  kid: "/kid-dashboard",
};

export const roles: UserRole[] = ["admin", "mother", "kid"];
export const statuses: UserStatus[] = ["active", "inactive"];
export const accessLevels: AccessLevel[] = ["none", "partial", "full"];

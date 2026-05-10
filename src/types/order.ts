import type { CartItem } from "./cart";
import type { Address } from "./address";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  address: Address;
  subtotal: number;
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
  updatedAt: string;
}

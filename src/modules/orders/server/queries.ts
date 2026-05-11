import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/order.model";
import type { Order as OrderType } from "@/types/order";

export async function getOrders(): Promise<OrderType[]> {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(orders));
}

export async function getOrderById(id: string): Promise<OrderType | null> {
  await connectDB();
  const order = await Order.findById(id).lean();
  return JSON.parse(JSON.stringify(order));
}

export async function getOrdersByEmail(email: string): Promise<OrderType[]> {
  await connectDB();
  const orders = await Order.find({ "address.email": email })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(orders));
}

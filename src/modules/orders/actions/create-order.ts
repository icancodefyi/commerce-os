"use server";

import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/order.model";
import type { Address } from "@/types/address";
import type { CartItem } from "@/types/cart";

interface CreateOrderInput {
  items: CartItem[];
  address: Address;
  razorpayOrderId: string;
  paymentId: string;
}

export async function createOrder({
  items,
  address,
  razorpayOrderId,
  paymentId,
}: CreateOrderInput) {
  try {
    await connectDB();

    const orderItems = items.map((i) => ({
      productId: i.product._id,
      title: i.product.title,
      price: i.product.price,
      quantity: i.quantity,
      image: i.product.images?.[0] ?? "",
    }));

    const subtotal = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    const order = await Order.create({
      items: orderItems,
      address,
      subtotal,
      total: subtotal,
      status: "paid",
      razorpayOrderId,
      paymentId,
    });

    const plain = order.toObject();
    return { success: true, orderId: plain._id.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

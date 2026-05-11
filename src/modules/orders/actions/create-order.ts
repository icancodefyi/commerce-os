"use server";

import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";
import type { Address } from "@/types/address";
import type { CartItem } from "@/types/cart";

interface PlaceOrderInput {
  items: CartItem[];
  address: Address;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  userId?: string;
}

export async function placeOrder({
  items,
  address,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  userId,
}: PlaceOrderInput) {
  try {
    // Verify signature
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return { success: false, error: "Payment verification failed." };
    }

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
      paymentId: razorpayPaymentId,
      userId: userId ?? "",
    });

    // Decrement stock for each item
    await Promise.all(
      items.map((i) =>
        Product.findByIdAndUpdate(i.product._id, {
          $inc: { stock: -i.quantity },
        })
      )
    );

    const plain = order.toObject();
    return { success: true, orderId: plain._id.toString() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

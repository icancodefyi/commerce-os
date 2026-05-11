"use server";

import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";
import type { Address } from "@/types/address";
import type { CartItem } from "@/types/cart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    // Get userId from auth if not provided
    if (!userId) {
      const session = await auth.api.getSession({ headers: await headers() });
      if (session?.user?.id) {
        userId = session.user.id;
      }
    }

    // Verify Razorpay signature
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return { success: false, error: "Payment verification failed." };
    }

    await connectDB();

    // Server-side stock validation
    const productIds = items.map((i) => i.product._id);
    const dbProducts = await Product.find({ _id: { $in: productIds } }).lean();

    for (const item of items) {
      const dbProduct = dbProducts.find(
        (p: any) => p._id.toString() === item.product._id
      );
      if (!dbProduct) {
        return { success: false, error: `"${item.product.title}" no longer exists.` };
      }
      if ((dbProduct as any).stock < item.quantity) {
        return {
          success: false,
          error: `"${item.product.title}" only has ${(dbProduct as any).stock} unit(s) left.`,
        };
      }
    }

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

    // Decrement stock
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

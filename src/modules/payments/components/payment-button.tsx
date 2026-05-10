"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { useCheckoutStore } from "@/modules/checkout/store/use-checkout-store";
import { createRazorpayOrder } from "@/modules/payments/actions/create-razorpay-order";
import { createOrder } from "@/modules/orders/actions/create-order";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { items, clearCart, total } = useCartStore();
  const address = useCheckoutStore((s) => s.address);
  const clearCheckout = useCheckoutStore((s) => s.clear);

  async function handlePayment() {
    if (!address) return;
    setLoading(true);

    const amountInPaise = total() * 100;
    const result = await createRazorpayOrder(amountInPaise);

    if (!result.success || !result.order) {
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: result.order.amount,
      currency: result.order.currency,
      order_id: result.order.id,
      name: "Commerce OS",
      description: "Order Payment",
      handler: async (response: any) => {
        const orderResult = await createOrder({
          items,
          address,
          razorpayOrderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
        });

        if (orderResult.success) {
          clearCart();
          clearCheckout();
          router.push(`/orders/${orderResult.orderId}`);
        }
      },
      prefill: {
        name: address.fullName,
        contact: address.phone,
      },
      theme: { color: "#000000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
    >
      {loading ? "Processing..." : `Pay ₹${total()}`}
    </button>
  );
}

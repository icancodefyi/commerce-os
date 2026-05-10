"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { useCheckoutStore } from "@/modules/checkout/store/use-checkout-store";
import { createRazorpayOrder } from "@/modules/payments/actions/create-razorpay-order";
import { placeOrder } from "@/modules/orders/actions/create-order";

declare global {
  interface Window { Razorpay: any; }
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

    const result = await createRazorpayOrder(total() * 100);
    if (!result.success || !result.order) { setLoading(false); return; }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: result.order.amount,
      currency: result.order.currency,
      order_id: result.order.id,
      name: "Commerce OS",
      handler: async (response: any) => {
        const orderResult = await placeOrder({
          items,
          address,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });

        if (orderResult.success) {
          clearCart();
          clearCheckout();
          router.push(`/orders/${orderResult.orderId}`);
        }
      },
      prefill: { name: address.fullName, contact: address.phone },
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
      className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase disabled:opacity-40 transition-opacity"
    >
      {loading ? "Processing..." : `Place Order — ₹${total()}`}
    </button>
  );
}

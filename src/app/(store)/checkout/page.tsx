"use client";

import { useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/modules/cart/store/use-cart-store";
import { useCheckoutStore } from "@/modules/checkout/store/use-checkout-store";
import { AddressForm } from "@/modules/checkout/components/address-form";
import { OrderSummary } from "@/modules/checkout/components/order-summary";
import { PaymentButton } from "@/modules/payments/components/payment-button";

export default function CheckoutPage() {
  const [step, setStep] = useState<"address" | "payment">("address");
  const items = useCartStore((s) => s.items);
  const address = useCheckoutStore((s) => s.address);

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto py-20 px-4 text-center">
        <p className="text-zinc-400">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            {step === "address" ? (
              <AddressForm onComplete={() => setStep("payment")} />
            ) : (
              <div className="space-y-4">
                <div className="border rounded-xl p-4 text-sm space-y-1">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">Shipping to</p>
                    <button
                      onClick={() => setStep("address")}
                      className="text-xs underline text-zinc-500"
                    >
                      Change
                    </button>
                  </div>
                  <p>{address?.fullName}</p>
                  <p>{address?.line1}{address?.line2 ? `, ${address.line2}` : ""}</p>
                  <p>{address?.city}, {address?.state} — {address?.pincode}</p>
                  <p>{address?.phone}</p>
                </div>

                <PaymentButton />
              </div>
            )}
          </div>

          <OrderSummary items={items} />
        </div>
      </main>
    </>
  );
}

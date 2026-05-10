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
      <main className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="font-serif text-3xl text-zinc-300 mb-3">Empty</p>
        <p className="text-xs tracking-widest uppercase text-zinc-400">
          Add items to your cart to continue
        </p>
      </main>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-2">Secure</p>
          <h1 className="font-serif text-4xl font-normal">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-[1fr_400px] gap-16">
          {/* Left — steps */}
          <div>
            {step === "address" ? (
              <AddressForm onComplete={() => setStep("payment")} />
            ) : (
              <div className="space-y-6">
                {/* Address review */}
                <div className="border border-zinc-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs tracking-widest uppercase text-zinc-400">
                      Shipping to
                    </p>
                    <button
                      onClick={() => setStep("address")}
                      className="text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-2"
                    >
                      Change
                    </button>
                  </div>
                  <div className="space-y-1 text-sm text-zinc-600">
                    <p className="font-medium text-zinc-900">{address?.fullName}</p>
                    <p>{address?.line1}{address?.line2 ? `, ${address.line2}` : ""}</p>
                    <p>{address?.city}, {address?.state} — {address?.pincode}</p>
                    <p className="text-zinc-400">{address?.phone}</p>
                  </div>
                </div>

                <PaymentButton />
              </div>
            )}
          </div>

          {/* Right — summary */}
          <OrderSummary items={items} />
        </div>
      </main>
    </>
  );
}

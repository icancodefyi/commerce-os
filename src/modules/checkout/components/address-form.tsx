"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, type AddressFormData } from "../validations/address-schema";
import { useCheckoutStore } from "../store/use-checkout-store";

const inputClass =
  "w-full border-b border-zinc-200 bg-transparent py-3 text-sm placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors";

export function AddressForm({ onComplete }: { onComplete: () => void }) {
  const setAddress = useCheckoutStore((s) => s.setAddress);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  function onSubmit(data: AddressFormData) {
    setAddress(data);
    onComplete();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-6">
          Shipping Address
        </p>

        <div className="space-y-6">
          <div>
            <input {...register("fullName")} placeholder="Full Name" className={inputClass} />
            {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <input {...register("email")} type="email" placeholder="Email Address" className={inputClass} />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input {...register("phone")} placeholder="Phone Number" className={inputClass} />
            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <input {...register("line1")} placeholder="Address Line 1" className={inputClass} />
            {errors.line1 && <p className="text-xs text-red-400 mt-1">{errors.line1.message}</p>}
          </div>

          <div>
            <input {...register("line2")} placeholder="Address Line 2 (optional)" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <input {...register("city")} placeholder="City" className={inputClass} />
              {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <input {...register("state")} placeholder="State" className={inputClass} />
              {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div>
            <input {...register("pincode")} placeholder="Pincode" className={inputClass} />
            {errors.pincode && <p className="text-xs text-red-400 mt-1">{errors.pincode.message}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
}

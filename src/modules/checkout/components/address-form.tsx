"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, type AddressFormData } from "../validations/address-schema";
import { useCheckoutStore } from "../store/use-checkout-store";

export function AddressForm({ onComplete }: { onComplete: () => void }) {
  const setAddress = useCheckoutStore((s) => s.setAddress);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({ resolver: zodResolver(addressSchema) });

  function onSubmit(data: AddressFormData) {
    setAddress(data);
    onComplete();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Shipping Address</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <input
            {...register("line1")}
            placeholder="Address Line 1"
            className="w-full border p-3 rounded-lg"
          />
          {errors.line1 && (
            <p className="text-red-500 text-xs mt-1">{errors.line1.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <input
            {...register("line2")}
            placeholder="Address Line 2 (optional)"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <input
            {...register("city")}
            placeholder="City"
            className="w-full border p-3 rounded-lg"
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("state")}
            placeholder="State"
            className="w-full border p-3 rounded-lg"
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("pincode")}
            placeholder="Pincode"
            className="w-full border p-3 rounded-lg"
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        Continue to Payment
      </button>
    </form>
  );
}

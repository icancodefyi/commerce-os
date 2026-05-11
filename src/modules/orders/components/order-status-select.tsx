"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/modules/orders/actions/update-order-status";

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({
  orderId,
  current,
}: {
  orderId: string;
  current: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={current}
      disabled={isPending}
      onChange={(e) =>
        startTransition(async () => {
          await updateOrderStatus(orderId, e.target.value);
        })
      }
      className="text-xs border border-zinc-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-zinc-400 disabled:opacity-50 cursor-pointer"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}

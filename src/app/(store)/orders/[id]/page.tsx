import { getOrderById } from "@/modules/orders/server/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) return notFound();

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">Thank you</p>
        <h1 className="font-serif text-5xl font-normal mb-4">Order Confirmed</h1>
        <p className="text-sm text-zinc-400 font-mono">{order._id}</p>
      </div>

      {/* Items */}
      <div className="border-t border-zinc-100 py-8 space-y-6 mb-8">
        {order.items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-14 h-16 bg-zinc-50 shrink-0" />
            <div className="flex-1 flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Qty {item.quantity}</p>
              </div>
              <p className="text-sm">₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="border-t border-zinc-100 pt-5 flex justify-between items-baseline">
          <span className="text-xs tracking-widest uppercase text-zinc-400">Total</span>
          <span className="font-serif text-2xl">₹{order.total}</span>
        </div>
      </div>

      {/* Address */}
      <div className="border-t border-zinc-100 py-8 mb-12">
        <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">Shipping to</p>
        <div className="space-y-1 text-sm text-zinc-600">
          <p className="font-medium text-zinc-900">{order.address.fullName}</p>
          <p>{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}</p>
          <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
          <p className="text-zinc-400">{order.address.phone}</p>
        </div>
      </div>

      <Link
        href="/products"
        className="inline-block bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </main>
  );
}

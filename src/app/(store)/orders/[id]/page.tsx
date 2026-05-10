import { getOrderById } from "@/modules/orders/server/queries";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) return notFound();

  return (
    <main className="max-w-2xl mx-auto py-16 px-4 text-center">
      <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
      <h1 className="text-2xl font-bold">Order Confirmed!</h1>
      <p className="text-zinc-500 mt-2 mb-8">
        Order ID: <span className="font-mono text-sm">{order._id}</span>
      </p>

      <div className="border rounded-xl p-5 text-left space-y-3 mb-6">
        <h2 className="font-semibold">Items</h2>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>
              {item.title} <span className="text-zinc-400">× {item.quantity}</span>
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      <div className="border rounded-xl p-5 text-left text-sm space-y-1 mb-8">
        <h2 className="font-semibold mb-2">Shipping to</h2>
        <p>{order.address.fullName}</p>
        <p>{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}</p>
        <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
        <p>{order.address.phone}</p>
      </div>

      <Link href="/products" className="bg-black text-white px-6 py-3 rounded-xl">
        Continue Shopping
      </Link>
    </main>
  );
}

import { auth } from "@/lib/auth";
import { getOrders } from "@/modules/orders/server/queries";
import { brand } from "@/config/brand";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AccountOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in?callbackUrl=/account/orders");

  // Get all orders and filter by userId
  const allOrders = await getOrders();
  const orders = allOrders.filter((o: any) => o.userId === session.user.id);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-2">
          My Account
        </p>
        <h1 className="font-serif text-3xl font-normal">Order History</h1>
        <p className="text-sm text-zinc-400 mt-1">Welcome, {session.user.name}</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 border border-zinc-100 rounded-xl">
          <p className="font-serif text-2xl text-zinc-300 mb-3">No orders yet</p>
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-8">
            Your order history will appear here
          </p>
          <Link
            href="/products"
            className="bg-black text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-zinc-100 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-xs text-zinc-400 mb-1">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[order.status] ?? "bg-zinc-100 text-zinc-500"}`}>
                    {order.status}
                  </span>
                  <p className="font-serif text-lg">{brand.currency}{order.total}</p>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-zinc-600">
                    <span>{item.title} <span className="text-zinc-400">× {item.quantity}</span></span>
                    <span>{brand.currency}{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

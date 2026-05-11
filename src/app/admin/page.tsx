import { getAdminStats } from "@/modules/orders/server/admin-stats";
import { brand } from "@/config/brand";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Total Revenue", value: `${brand.currency}${stats.totalRevenue.toLocaleString("en-IN")}`, sub: "From paid orders" },
    { label: "Total Orders", value: stats.totalOrders, sub: `${stats.pendingOrders} pending` },
    { label: "Products", value: stats.totalProducts, sub: "Active listings" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Welcome back to {brand.name}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div key={card.label} className="border rounded-xl p-5 bg-white">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-zinc-900">{card.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-zinc-800">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-zinc-400 hover:text-zinc-700 underline">
            View all
          </Link>
        </div>

        <div className="border rounded-xl overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-zinc-500">Order</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500">Total</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-400">
                    No orders yet.
                  </td>
                </tr>
              )}
              {stats.recentOrders.map((order: any) => (
                <tr key={order._id} className="border-b last:border-0 hover:bg-zinc-50">
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 font-medium">{order.address.fullName}</td>
                  <td className="px-4 py-3">{brand.currency}{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[order.status] ?? "bg-zinc-100 text-zinc-500"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { getOrders } from "@/modules/orders/server/queries";
import { OrderStatusSelect } from "@/modules/orders/components/order-status-select";
import { brand } from "@/config/brand";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-zinc-400 mt-1">{orders.length} total orders</p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Order</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Customer</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Items</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Total</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b last:border-0 hover:bg-zinc-50">
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  #{order._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{order.address.fullName}</p>
                  <p className="text-xs text-zinc-400">{order.address.phone}</p>
                </td>
                <td className="px-4 py-3 text-zinc-500">{order.items.length} item(s)</td>
                <td className="px-4 py-3 font-medium">{brand.currency}{order.total}</td>
                <td className="px-4 py-3">
                  <OrderStatusSelect orderId={order._id} current={order.status} />
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

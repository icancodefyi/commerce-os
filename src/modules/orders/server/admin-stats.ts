import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/order.model";
import { Product } from "@/models/product.model";

export async function getAdminStats() {
  await connectDB();

  const [orders, products] = await Promise.all([
    Order.find({}).lean(),
    Product.countDocuments(),
  ]);

  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return {
    totalOrders: orders.length,
    totalRevenue: revenue,
    totalProducts: products,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    recentOrders: JSON.parse(JSON.stringify(recentOrders)),
  };
}

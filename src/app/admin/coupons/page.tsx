import { connectDB } from "@/lib/mongodb";
import { Coupon } from "@/models/coupon.model";
import Link from "next/link";
import { CouponActions } from "@/modules/coupons/components/coupon-actions";
import { Pagination } from "@/components/ui/pagination";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function CouponsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth.api.getSession();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  await connectDB();

  const page = Number(searchParams.page) || 1;
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  const coupons = await Coupon.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .lean();

  const totalCount = await Coupon.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <Link
          href="/admin/coupons/new"
          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-zinc-900 transition-colors"
        >
          New Coupon
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Code</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Value</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Min Order</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Usage</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Expires</th>
              <th className="text-right px-4 py-3 font-semibold text-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-zinc-400">
                  No coupons found
                </td>
              </tr>
            ) : (
              coupons.map((coupon: any) => (
                <tr key={coupon._id} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="px-4 py-3 font-mono font-semibold">{coupon.code}</td>
                  <td className="px-4 py-3 capitalize">
                    <span className="text-xs px-2 py-1 bg-zinc-100 rounded">
                      {coupon.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {coupon.type === "percent" ? `${coupon.value}%` : `₹${coupon.value}`}
                  </td>
                  <td className="px-4 py-3">₹{coupon.minOrder}</td>
                  <td className="px-4 py-3 text-xs text-zinc-500">
                    {coupon.usedCount} / {coupon.usageLimit === 0 ? "∞" : coupon.usageLimit}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-500">
                    {coupon.expiresAt
                      ? new Date(coupon.expiresAt).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/coupons/${coupon._id}`}
                        className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <CouponActions id={coupon._id.toString()} active={coupon.active} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination page={page} totalPages={totalPages} basePath="/admin/coupons" />
        </div>
      )}
    </div>
  );
}

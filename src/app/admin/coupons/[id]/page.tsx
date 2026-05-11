import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Coupon } from "@/models/coupon.model";
import { EditCouponForm } from "@/modules/coupons/components/edit-coupon-form";
import { notFound } from "next/navigation";

export default async function EditCouponPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth.api.getSession();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  await connectDB();
  const coupon = await Coupon.findById(params.id).lean();

  if (!coupon) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Coupon</h1>
        <Link href="/admin/coupons" className="text-sm text-zinc-400 hover:text-zinc-700">
          ← Back
        </Link>
      </div>
      <EditCouponForm coupon={coupon} />
    </div>
  );
}

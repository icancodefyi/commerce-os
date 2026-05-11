import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewCouponForm } from "@/modules/coupons/components/new-coupon-form";
import { headers } from "next/headers";

export default async function NewCouponPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">New Coupon</h1>
        <Link href="/admin/coupons" className="text-sm text-zinc-400 hover:text-zinc-700">
          ← Back
        </Link>
      </div>
      <NewCouponForm />
    </div>
  );
}

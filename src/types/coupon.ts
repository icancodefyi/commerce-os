export interface Coupon {
  _id: string;
  code: string;
  type: "flat" | "percent";
  value: number;
  minOrder: number;
  usageLimit: number;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
}

import { Schema, models, model } from "mongoose";

const WishlistSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    productIds: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

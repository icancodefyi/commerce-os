"use server";

import { connectDB } from "@/lib/mongodb";
import { Wishlist } from "@/models/wishlist.model";
import { auth } from "@/lib/auth";

export async function toggleWishlist(productId: string) {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await connectDB();

    const wishlist = await Wishlist.findOne({ userId: session.user.id });

    if (!wishlist) {
      // Create new wishlist
      await Wishlist.create({
        userId: session.user.id,
        productIds: [productId],
      });
      return { success: true, added: true };
    }

    const isInWishlist = wishlist.productIds.includes(productId);

    if (isInWishlist) {
      // Remove from wishlist
      wishlist.productIds = wishlist.productIds.filter((id: string) => id !== productId);
    } else {
      // Add to wishlist
      wishlist.productIds.push(productId);
    }

    await wishlist.save();
    return { success: true, added: !isInWishlist };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getWishlist() {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await connectDB();

    const wishlist = await Wishlist.findOne({ userId: session.user.id }).lean();

    return {
      success: true,
      productIds: wishlist?.productIds || [],
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function isInWishlist(productId: string) {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return false;
    }

    await connectDB();

    const wishlist = await Wishlist.findOne({
      userId: session.user.id,
      productIds: productId,
    });

    return !!wishlist;
  } catch {
    return false;
  }
}

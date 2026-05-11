"use client";

import { useState } from "react";
import { toggleWishlist } from "@/modules/users/actions/wishlist-actions";
import { toast } from "sonner";
import Link from "next/link";

export function WishlistButton({ productId }: { productId: string }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleToggle() {
    setPending(true);
    try {
      const result = await toggleWishlist(productId);
      if (result.success && "added" in result) {
        setIsInWishlist(result.added as boolean);
        toast.success(result.added ? "Added to wishlist" : "Removed from wishlist");
      } else if ("error" in result) {
        if (result.error === "Not authenticated") {
          toast.error("Please sign in to add to wishlist");
          // Optionally redirect to sign-in
          setTimeout(() => {
            window.location.href = "/sign-in?callbackUrl=" + window.location.pathname;
          }, 1000);
        } else {
          toast.error(result.error || "Failed to update wishlist");
        }
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className="flex items-center justify-center w-10 h-10 rounded-full border transition-all disabled:opacity-50"
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      style={{
        borderColor: isInWishlist ? "#000" : "#e4e4e7",
        backgroundColor: isInWishlist ? "#000" : "transparent",
      }}
    >
      <svg
        className="w-5 h-5"
        fill={isInWishlist ? "white" : "none"}
        stroke={isInWishlist ? "none" : "currentColor"}
        strokeWidth={isInWishlist ? 0 : 1.5}
        viewBox="0 0 24 24"
        style={{ color: isInWishlist ? "white" : "#a1a1a1" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-1.085-.667-2.025-1.585-2.247a49.52 49.52 0 00-3.374-.645m0 0c.577.645-1.707.106-2.141.706m0 0c.25.5-.5 1.5-.5 1.5m0 0c-1 2-3 4-5 4-2 0-4-2-5-4m0 0c0 0-.75-1-.5-1.5m0 0C3.75 6.228 3.083 7.168 3 8.25M3 12a9 9 0 018.25 9m0 0a9 9 0 008.25-9"
        />
      </svg>
    </button>
  );
}

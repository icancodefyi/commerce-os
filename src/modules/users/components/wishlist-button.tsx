"use client";

import { useState, useEffect } from "react";
import { toggleWishlist } from "@/modules/users/actions/wishlist-actions";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

export function WishlistButton({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [pending, setPending] = useState(false);

  // Check initial wishlist status - we'll do this on the client
  // Since we can't call server actions directly from useEffect without hydration issues,
  // we'll just track local state

  async function handleToggle() {
    if (!session?.user?.id) {
      toast.error("Please sign in to add to wishlist");
      return;
    }

    setPending(true);
    try {
      const result = await toggleWishlist(productId);
      if (result.success && "added" in result) {
        setIsInWishlist(result.added as boolean);
        toast.success(result.added ? "Added to wishlist" : "Removed from wishlist");
      } else {
        toast.error("error" in result ? result.error : "Failed to update wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    } finally {
      setPending(false);
    }
  }

  if (!session?.user?.id) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-400 transition-colors"
        title="Sign in to add to wishlist"
      >
        <svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 8.25c0-1.085-.667-2.025-1.585-2.247m-4.368.634a9.01 9.01 0 015.753 3.997m0 0c.164.065.324.143.485.221m0 0A9.005 9.005 0 0121 12a9.005 9.005 0 01-.337 2.247m0 0c-.164.065-.324.143-.485.221m0 0a9.01 9.01 0 01-5.753-3.997m0 0c-.164-.065-.324-.143-.485-.221m0 0A9.005 9.005 0 003 12a9.005 9.005 0 00.337 2.247m0 0c.164.065.324.143.485.221m0 0a9.01 9.01 0 005.753-3.997m0 0c.164-.065.324-.143.485-.221m0 0A9.005 9.005 0 003 12"
          />
        </svg>
      </Link>
    );
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

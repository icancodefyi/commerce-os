import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Wishlist } from "@/models/wishlist.model";
import { Product } from "@/models/product.model";
import Link from "next/link";
import Image from "next/image";
import { WishlistButton } from "@/modules/users/components/wishlist-button";
import type { Product as ProductType } from "@/types/product";

export default async function WishlistPage() {
  const session = await auth.api.getSession();
  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=/account/wishlist");
  }

  await connectDB();

  const wishlist = await Wishlist.findOne({ userId: session.user.id }).lean();
  const productIds = wishlist?.productIds || [];

  let products: ProductType[] = [];
  if (productIds.length > 0) {
    products = (await Product.find({
      _id: { $in: productIds },
      status: "active",
    })
      .lean()
      .exec()) as ProductType[];
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-serif mb-2">Wishlist</h1>
        <p className="text-zinc-400 mb-8">Items you've saved for later</p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">Your wishlist is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-900 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => {
              const image =
                product.images?.[0] ||
                `https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop`;

              return (
                <div key={product._id} className="group">
                  <div className="relative mb-4 h-96 overflow-hidden rounded-lg bg-zinc-100">
                    <Image
                      src={image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <WishlistButton productId={product._id.toString()} />
                    </div>
                  </div>

                  <Link href={`/products/${product.slug}`} className="block mb-2">
                    <h3 className="font-serif text-lg mb-1 group-hover:underline">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-zinc-600 mb-3">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="font-semibold">₹{product.price}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-zinc-400 line-through">
                          ₹{product.comparePrice}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs tracking-widest uppercase hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

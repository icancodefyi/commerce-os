import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <Skeleton className="h-3 w-32 mb-3" />
        <Skeleton className="h-12 w-64" />
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-3 mb-12">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[3/4] w-full mb-4" />
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </main>
  );
}

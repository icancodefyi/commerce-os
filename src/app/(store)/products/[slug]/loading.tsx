import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
        <Skeleton className="aspect-[3/4] w-full" />
        <div className="flex flex-col justify-center py-8 space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="pt-4">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

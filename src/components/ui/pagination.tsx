import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ page, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <p className="text-zinc-400 text-xs">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link
            href={`${basePath}?page=${page - 1}`}
            className="px-3 py-1.5 border border-zinc-200 rounded text-xs hover:bg-zinc-50 transition-colors"
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`${basePath}?page=${page + 1}`}
            className="px-3 py-1.5 border border-zinc-200 rounded text-xs hover:bg-zinc-50 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

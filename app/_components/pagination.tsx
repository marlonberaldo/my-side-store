"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { parseAsInteger, useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  hasMore: boolean;
  defaultPage?: number;
  defaultLimit?: number;
}

export function Pagination({ hasMore, defaultPage = 1, defaultLimit = 15 }: PaginationProps) {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(defaultPage).withOptions({
      shallow: false,
      history: "replace",
      scroll: true
    })
  );

  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(defaultLimit).withOptions({
      shallow: false,
      history: "replace",
      scroll: true
    })
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, [setPage]);

  return (
    <nav className="mt-10 flex items-center justify-end space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <Button variant="default" className="pointer-events-none font-semibold">{page}</Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasMore}
        className="disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </Button>

      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="rounded border px-2 py-1"
      >
        <option value={15}>15</option>
        <option value={30}>30</option>
        <option value={60}>60</option>
      </select>
    </nav>
  );
}
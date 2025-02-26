"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { Search } from "lucide-react";

interface SearchFormProps {
  className?: string;
}

const SearchForm = ({ className }: SearchFormProps) => {
  const router = useRouter();
  const qParam = useSearchParams().get("q");
  const [query, setQuery] = useState(qParam || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full max-w-[400px] rounded-lg border bg-background", className)}
    >
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg px-4 py-2 pl-10 text-sm font-semibold text-primary/70 placeholder:text-sm focus:ring-2 focus:ring-secondary"
      />
    </form>
  );
};

export default SearchForm;
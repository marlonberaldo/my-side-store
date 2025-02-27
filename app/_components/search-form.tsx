"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { Search } from "lucide-react";

interface SearchFormProps {
  className?: string;
  onSubmit?: () => void;
}

export const SearchForm = ({ className, onSubmit }: SearchFormProps) => {
  const qParam = useSearchParams().get("q");

  return (
    <Form
      action="/search"
      role="form"
      onSubmit={onSubmit}
      className={cn("relative w-full max-w-[500px] rounded-lg border bg-background", className)}
    >
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        key={qParam}
        name="q"
        type="text"
        placeholder="Pesquisar produtos..."
        autoComplete="off"
        defaultValue={qParam || ""}
        className="h-9 w-full rounded-lg px-4 pl-10 text-sm font-semibold text-primary/70 placeholder:text-sm focus:ring-2 focus:ring-secondary"
      />
    </Form>
  );
};

export function SearchSkeleton({ className }: { className?: string }) {

  return (
    <div className={cn("w-full max-w-[500px] rounded-lg border bg-primary/10", className)} />
  );
}
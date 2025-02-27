"use client";

import { useState, useTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: string[];
}

export default function Sidebar({ categories }: SidebarProps) {
  const pathName = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(pathName);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);

    startTransition(() => {
      router.replace(value);
    });
  };

  return (
    <aside className="z-40 h-full bg-background lg:sticky lg:top-[60px] lg:w-[220px] lg:min-w-[220px] lg:border-r lg:p-4">
      <div className="mb-4 lg:hidden">
        <label htmlFor="category-select" className="sr-only">
          Selecione uma categoria
        </label>
        <select
          id="category-select"
          className={cn("w-full sm:max-w-[350px] rounded border px-2 h-10 min-h-10",
            isPending && "opacity-50 pointer-events-none animate-pulse"
          )}
          value={selected}
          onChange={handleChange}
        >
          <option value="/search">Todos os produtos</option>
          {categories
            .sort((a, b) => a.localeCompare(b))
            .map((category) => (
              <option key={category} value={`/search/${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
        </select>
      </div>

      <ol className="hidden gap-1 lg:flex lg:flex-col">
        <li>
          <Button
            variant={pathName === "/search" ? "default" : "ghost"}
            asChild
            className={cn("w-full justify-start text-left text-sm",
              pathName === "/search" && "font-bold"
            )}
          >
            <Link href="/search">
              Todos os produtos
            </Link>
          </Button>
        </li>

        {categories
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <li key={category}>
              <Button
                variant={pathName.includes(category) ? "default" : "ghost"}
                asChild
                className={cn("w-full justify-start text-left text-sm",
                  pathName.includes(category) && "font-bold"
                )}
              >
                <Link href={`/search/${category}`} aria-current={false}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </Button>
            </li>
          ))}
      </ol>
    </aside>
  );
};

export function SidebarFallback() {
  return (
    <aside className="z-40 h-full bg-background lg:sticky lg:top-[60px] lg:w-[220px] lg:min-w-[220px] lg:border-r lg:p-4">
      <div className="mb-4 lg:hidden">
        <div className="pointer-events-none flex h-10 min-h-10 w-full animate-pulse items-center justify-start rounded border bg-primary/10 px-2 opacity-50 sm:max-w-[350px]" />
      </div>

      <ol className="hidden gap-1 lg:flex lg:flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={`category-${index}`}
            className="h-10 min-h-10 w-full animate-pulse rounded border bg-primary/10 px-2"
          />
        ))}
      </ol>
    </aside>
  );
}

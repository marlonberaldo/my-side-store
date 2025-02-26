"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: string[];
}

export default function Sidebar({ categories }: SidebarProps) {

  const pathName = usePathname();

  return (
    <aside className="scrollbar-hide z-40 h-full overflow-x-auto bg-background lg:sticky lg:top-[60px] lg:w-[220px] lg:min-w-[220px] lg:border-r lg:p-4">
      <ol className="flex gap-1 lg:flex-col">
        <li>
          <Button
            variant={pathName === "/search" ? "default" : "ghost"}
            asChild
            className={cn("w-full justify-start text-left text-sm",
              pathName === "/search" && "font-bold"
            )}
          >
            <Link href="/search">
              All products
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
                  {category}
                </Link>
              </Button>
            </li>
          ))}
      </ol>
    </aside>
  );
};
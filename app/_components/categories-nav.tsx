import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getCategories } from "@/services/categories";

const CategoriesNav = async () => {

  const { categories } = await getCategories();

  return (
    <nav className="flex w-full items-center gap-x-2 overflow-x-auto">
      <Button variant="default" asChild className="text-sm">
        <Link href="/search">
          All Products
        </Link>
      </Button>

      {categories
        .sort((a, b) => a.localeCompare(b))
        .map((category) => (
          <Button key={category} variant="outline" asChild className="text-sm">
            <Link href={`/search/${category}`}>
              {category}
            </Link>
          </Button>
        ))}

    </nav>
  );
};

export default CategoriesNav;
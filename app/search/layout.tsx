import { Suspense } from "react";

import Sidebar from "./_components/sidebar";

import { getCategories } from "@/services/categories";

import ChildrenWrapper from "./children-wrapper";

export default async function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const { categories } = await getCategories();

  return (
    <div className="flex flex-col items-stretch gap-[25px] lg:flex-row">
      <Sidebar categories={categories} />

      <div className="flex flex-1">
        <Suspense fallback={null}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Suspense>
      </div>
    </div>
  );
}
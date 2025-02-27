import { Suspense } from "react";

import Sidebar, { SidebarFallback } from "./_components/sidebar";

import { getCategories } from "@/services/categories";

import ChildrenWrapper from "./children-wrapper";

async function GetSidebar() {
  const { categories } = await getCategories();

  return <Sidebar categories={categories} />;
}

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <div className="flex flex-col items-stretch gap-[25px] lg:flex-row">
      <Suspense fallback={<SidebarFallback />}>
        <GetSidebar />
      </Suspense>

      <div className="flex flex-1">
        <Suspense fallback={null}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Suspense>
      </div>
    </div>
  );
}
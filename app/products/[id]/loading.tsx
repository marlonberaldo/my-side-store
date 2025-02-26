export default function SingleProductLoading() {

  return (
    <div className="relative flex flex-col justify-between gap-[25px] lg:flex-row lg:items-start">
      <div className="relative aspect-[2/1.5] w-full lg:w-1/2">
        <div className="size-full animate-pulse rounded-lg bg-primary/10" />
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-1/2">
        <div className="h-8 w-3/4 animate-pulse rounded-md bg-primary/20" />
        <hr />

        <div className="h-4 w-full animate-pulse rounded-md bg-primary/10" />
        <div className="h-4 w-full animate-pulse rounded-md bg-primary/10" />
        <div className="h-4 w-full animate-pulse rounded-md bg-primary/10" />
        <div className="h-4 w-full animate-pulse rounded-md bg-primary/10" />
        <div className="h-4 w-full animate-pulse rounded-md bg-primary/10" />

        <div className="h-6 w-1/4 animate-pulse rounded-md bg-primary/10" />

        <div className="h-6 w-1/3 animate-pulse rounded-md bg-primary/10" />
        <div className="h-6 w-1/3 animate-pulse rounded-md bg-primary/10" />
        <div className="h-6 w-1/3 animate-pulse rounded-md bg-primary/10" />

        <div className="fixed bottom-0 left-0 z-10 w-full bg-background px-2 py-3 lg:static lg:p-0">
          <div className="h-12 w-full animate-pulse rounded-lg bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

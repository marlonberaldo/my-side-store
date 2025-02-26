export default function LoadingSearch() {

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="group flex flex-col space-y-4 rounded-lg border p-4 shadow-md"
        >
          <div className="mx-auto h-[300px] w-full animate-pulse rounded-lg bg-primary/10" />

          <div className="flex w-full flex-col justify-between space-y-3">
            <div>
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-primary/10" />
              <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-primary/10" />
            </div>

            <div className="flex items-center justify-between">
              <div className="h-6 w-1/4 animate-pulse rounded-lg bg-primary/10" />
              <div className="h-4 w-1/4 animate-pulse rounded-lg bg-primary/10" />
            </div>

            <div className="!mt-6 flex gap-2">
              <div className="size-10 animate-pulse rounded-lg bg-primary/10" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-primary/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
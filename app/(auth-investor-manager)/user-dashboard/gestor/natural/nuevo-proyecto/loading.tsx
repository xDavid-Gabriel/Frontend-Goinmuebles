import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col gap-7">
      <Skeleton className="h-[42px] w-full max-w-[800px] bg-tomato/50" />
      <div className="space-y-2">
        <Skeleton className="h-[40px] w-[200px] bg-tomato/50" />
        <Skeleton className="h-[450px] w-full max-w-[800px] bg-tomato/50" />
      </div>
    </div>
  );
}

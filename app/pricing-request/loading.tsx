import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-[300px] mx-auto" />
          <Skeleton className="h-6 w-[500px] mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

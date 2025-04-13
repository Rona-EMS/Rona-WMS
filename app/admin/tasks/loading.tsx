import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TasksLoading() {
  return (
    <DashboardShell title="Administrative Tasks" description="Manage and track administrative tasks">
      {/* Skeleton for statistics cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-8 w-[60px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Skeleton for tabs */}
      <div className="mb-6">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Skeleton for tasks list */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[200px] rounded-md" />
              <Skeleton className="h-10 w-[100px] rounded-md" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 rounded-full mt-1" />
                    <div className="space-y-2 w-full">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-[200px]" />
                        <Skeleton className="h-5 w-[60px] rounded-full" />
                        <Skeleton className="h-5 w-[80px] rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

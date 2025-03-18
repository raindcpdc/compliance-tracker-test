import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card"

const SkeletonManageUsers = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i)

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <CardTitle className="text-2xl">Manage Users</CardTitle>
            <CardDescription>Edit or disable users</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto_auto] md:grid-cols-[1.5fr_1fr_120px_120px] gap-4 p-4 bg-muted/50 border-b">
            <div className="font-medium">Name</div>
            <div className="font-medium hidden md:block">Role</div>
            <div className="font-medium md:block">Status</div>
            <div className="font-medium text-right">Actions</div>
          </div>
          <div className="divide-y">
            {skeletonRows.map((index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_auto_auto] md:grid-cols-[1.5fr_1fr_120px_120px] gap-4 p-4 items-center"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="md:flex items-center">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SkeletonManageUsers

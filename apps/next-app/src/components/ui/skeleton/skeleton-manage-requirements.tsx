import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const SkeletonManageRequirements = () => {
  const skeletonRows = Array.from({ length: 4 }, (_, i) => i)

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <CardTitle className="text-2xl">Manage Requirements</CardTitle>
            <CardDescription>Add, edit, or remove requirements</CardDescription>
          </div>
          <div className="col-span-1 flex justify-end">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Requirement
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-gray-100">
            <div className="col-span-3">Name</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2 text-right">Due Date</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {skeletonRows.map((index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm"
              >
                <div className="col-span-3">
                  <Skeleton className="h-5 w-[180px]" />
                </div>
                <div className="col-span-4">
                  <Skeleton className="h-5 w-[250px]" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Skeleton className="h-5 w-[100px]" />
                </div>
                <div className="col-span-3 flex justify-end space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-9 w-[115px]" />{" "}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default SkeletonManageRequirements

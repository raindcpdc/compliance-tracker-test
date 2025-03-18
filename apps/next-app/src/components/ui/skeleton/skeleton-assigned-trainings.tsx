import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../card"
import { Skeleton } from "./skeleton"

const SkeletonAssignedTrainings = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Your Mandatory Trainings</CardTitle>
        <CardDescription>
          Track and update your progress on required trainings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Overall Completion</h3>
          {/* Progress bar */}
          <Skeleton className="h-full w-full" />
          <div className="text-sm text-muted-foreground">
            {/* "1 of 4 trainings completed" text */}
            <Skeleton className="h-5 w-44" />{" "}
          </div>
        </div>

        <div className="border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-gray-100">
            <div className="col-span-5">Training Name</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3">Actions</div>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center">
            <div className="col-span-5">
              <Skeleton className="h-5 w-[250px]" />{" "}
            </div>
            <div className="col-span-2">
              <Skeleton className="h-5 w-[100px]" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-6 w-24 rounded-full" />{" "}
            </div>
            <div className="col-span-3">
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SkeletonAssignedTrainings

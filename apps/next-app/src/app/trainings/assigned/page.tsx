import { Suspense } from "react"
import SkeletonAssignedTrainings from "@/components/ui/skeleton/skeleton-assigned-trainings"
import { AssignedTrainings } from "@/features/trainings"

export default async function AssignedTrainingsPage() {
  return (
    <div className="mt-10">
      <Suspense fallback={<SkeletonAssignedTrainings />}>
        <AssignedTrainings />
      </Suspense>
    </div>
  )
}

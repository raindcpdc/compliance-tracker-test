import { SkeletonManageTrainings } from "@/components/ui/skeleton"
import { TrainingsList } from "@/features/trainings"
import { Suspense } from "react"

export default function TrainingListPage() {
  return (
    <div className="mt-10">
      <Suspense fallback={<SkeletonManageTrainings />}>
        <TrainingsList />
      </Suspense>
    </div>
  )
}

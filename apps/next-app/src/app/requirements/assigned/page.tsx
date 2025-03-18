import { Suspense } from "react"
import SkeletonAssignedRequirements from "@/components/ui/skeleton/skeleton-assigned-requirements"
import { AssignedRequirements } from "@/features/requirements"

export default async function AssignedRequirementsPage() {
  return (
    <div className="mt-10">
      <Suspense fallback={<SkeletonAssignedRequirements />}>
        <AssignedRequirements />
      </Suspense>
    </div>
  )
}

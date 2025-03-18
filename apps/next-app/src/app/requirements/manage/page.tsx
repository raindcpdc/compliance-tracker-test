import { Suspense } from "react"
import { SkeletonManageRequirements } from "@/components/ui/skeleton"
import { RequirementsList } from "@/features/requirements"

export default async function RequirementsListPage() {
  return (
    <div className="mt-10">
      <Suspense fallback={<SkeletonManageRequirements />}>
        <RequirementsList />
      </Suspense>
    </div>
  )
}

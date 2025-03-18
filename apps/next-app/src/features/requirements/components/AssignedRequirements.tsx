"use client"
import Link from "next/link"
import { ResourceStatus } from "@/constants"
import { useAuth } from "@/lib/hooks/auth"
import { useAssignedRequirements } from "@/lib/hooks/requirements"
import { formatDate } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { StatusButton, StatusSelect } from "@/components/ui/status"
import { toast } from "sonner"

export default function AssignedRequirements() {
  const { authUser } = useAuth()
  const {
    data: assignedRequirements,
    fetchAgain,
    fetching,
    updateStatus,
  } = useAssignedRequirements(authUser?.id ?? 0)

  const completedCount = assignedRequirements?.filter(
    (item) => item.node.resource_status.id === ResourceStatus.COMPLETED
  ).length

  const totalCount = assignedRequirements?.length

  const progressPercentage =
    completedCount && totalCount && totalCount > 0
      ? (completedCount / totalCount) * 100
      : 0

  const handleStatusChange = async (id: string, status: string) => {
    const { data, error } = await updateStatus(parseInt(id), parseInt(status))

    if (error) {
      console.error(`update error : ${error.name}: ${error.message}`)
      toast.error("Failed to update status")
      return
    }

    if (data && data.updateassigned_compliance_resourceCollection) {
      toast.info("Status updated successfully")
      fetchAgain()
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Your Assigned Requirements</CardTitle>
        <CardDescription>
          Track and update your progress on required requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Overall Completion</h3>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {completedCount} of {totalCount} requirements completed
          </p>
        </div>

        <div className="border rounded-lg">
          <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground bg-gray-100">
            <div className="col-span-5">Requirement</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3">Actions</div>
          </div>

          {!fetching && assignedRequirements?.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No assigned requirements
            </div>
          )}

          {assignedRequirements?.map((item) => {
            const { node } = item
            const {
              id: assignedId,
              compliance_resource: resource,
              resource_status: status,
            } = node
            const { name, description, deadline_at, url } = resource
            return (
              <div
                key={assignedId}
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="col-span-5">
                  <h4 className="font-medium">
                    {url && (
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {name}
                      </Link>
                    )}
                    {!url && name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <div className="col-span-2 text-sm">
                  {deadline_at && (
                    <time dateTime={deadline_at}>
                      {formatDate(deadline_at, "MMM D, YYYY")}
                    </time>
                  )}
                </div>

                <div className="col-span-2 text-sm">
                  <StatusButton statusId={status.id} />
                </div>

                <div className="col-span-3">
                  <StatusSelect
                    assignedId={assignedId}
                    currentStatus={status.id}
                    onStatusChange={handleStatusChange}
                    placeholder="Select"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

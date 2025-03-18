import { useMutation, useQuery } from "@urql/next"
import { queryGetAssignedRequirements } from "@/lib/graphql/queries"
import { mutationUpdateAssignedRequirementStatus } from "@/lib/graphql/mutations"
import { ResourceStatus } from "@/constants"

export const useAssignedRequirements = (userId: number) => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: queryGetAssignedRequirements.toString(),
    variables: {
      userId,
    },
  })

  const [, updateAssignedRequirement] = useMutation(
    mutationUpdateAssignedRequirementStatus.toString()
  )

  const fetchAgain = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  const updateStatus = async (
    assignedComplianceId: number,
    statusId: ResourceStatus
  ) => {
    let startedDate = undefined
    let completedDate = null
    const modifiedDate = new Date().toISOString()

    switch (statusId) {
      case ResourceStatus.NOT_STARTED:
        break

      case ResourceStatus.IN_PROGRESS:
        startedDate = new Date().toISOString()
        break

      case ResourceStatus.COMPLETED:
        completedDate = new Date().toISOString()
        break

      default:
        throw new Error("Invalid status")
    }

    const { data, error } = await updateAssignedRequirement({
      assignedComplianceId,
      statusId,
      modifiedAt: modifiedDate,
      startedAt: startedDate,
      completedAt: completedDate,
    })
    return { data, error }
  }

  return {
    data: data?.assigned_compliance_resourceCollection?.edges,
    error,
    fetching,
    fetchAgain,
    updateStatus,
  }
}

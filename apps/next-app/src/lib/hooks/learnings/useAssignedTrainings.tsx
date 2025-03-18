import { useMutation, useQuery } from "@urql/next"
import { queryGetAssignedTrainings } from "@/lib/graphql/queries"
import { mutationUpdateAssignedTrainingStatus } from "@/lib/graphql/mutations"
import { ResourceStatus } from "@/constants"

export const useAssignedTrainings = (userId: number) => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: queryGetAssignedTrainings.toString(),
    variables: {
      userId,
    },
  })

  const [, updateAssignedTrainingStatus] = useMutation(
    mutationUpdateAssignedTrainingStatus.toString()
  )

  const fetchAgain = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  const updateStatus = async (
    assignedTrainingId: number,
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

    const { data, error } = await updateAssignedTrainingStatus({
      assignedTrainingId,
      statusId,
      modifiedAt: modifiedDate,
      startedAt: startedDate,
      completedAt: completedDate,
    })

    return { data, error }
  }

  return {
    data: data?.assigned_learning_resourceCollection?.edges,
    error,
    fetching,
    fetchAgain,
    updateStatus,
  }
}

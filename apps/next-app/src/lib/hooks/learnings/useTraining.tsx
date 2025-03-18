"use client"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@urql/next"
import {
  mutationDisableTraining,
  mutationInsertTraining,
  mutationUpdateTraining,
} from "@/lib/graphql/mutations"
import {
  queryGetAssignedUsersByTrainingResource,
  queryGetTraining,
} from "@/lib/graphql/queries"
import { AssignedUser } from "@/types"

interface TrainingModel {
  id: number
  name: string
  description?: string
  url?: string
  deadline_at?: string
  is_mandatory?: boolean
  learning_resource_type: {
    id: number
    name: string
    description?: string
  }
}
export interface TrainingInput {
  type_id: number
  name: string
  description?: string
  url?: string
  deadline_at?: string
  is_mandatory?: boolean
}

export interface UpdateTrainingInput {
  resourceId: number
  resourceDetails: TrainingInput
}

export const useTraining = (id: number) => {
  //TODO: handle no ID for add scenarios
  const [trainingData, setTrainingData] = useState<TrainingModel | null>(null)

  if (isNaN(id)) {
    throw new Error("Invalid input: ID must be a number")
  }

  const value = Number(id)
  const [{ data: queryData, fetching }, reexecuteGetTraining] = useQuery({
    query: queryGetTraining.toString(),
    variables: {
      id: value,
    },
    pause: true, // run query only when needed
  })

  const [{ data: assignedUserList, fetching: fetchingUserList }, getUsers] =
    useQuery({
      query: queryGetAssignedUsersByTrainingResource.toString(),
      variables: {
        resourceId: id,
      },
      pause: true,
    })

  const [, insertTraining] = useMutation(mutationInsertTraining.toString())
  const [, updateTraining] = useMutation(mutationUpdateTraining.toString())
  const [, disableTraining] = useMutation(mutationDisableTraining.toString())

  useEffect(() => {
    if (!queryData || !queryData.learning_resourceCollection) {
      return
    }

    setTrainingData(
      queryData.learning_resourceCollection.edges[0].node as TrainingModel
    )
  }, [queryData, fetching])

  const getTraining = () => {
    reexecuteGetTraining({ requestPolicy: "network-only" })
  }

  const addTraining = async (input: TrainingInput) => {
    const { data, error } = await insertTraining({
      input,
    })

    return { data, error }
  }

  const editTraining = async (input: UpdateTrainingInput) => {
    const { data, error } = await updateTraining({
      resourceId: input.resourceId,
      resourceDetails: input.resourceDetails,
    })

    return { data, error }
  }

  const removeTraining = async (id: number) => {
    if (isNaN(id)) {
      throw new Error("Invalid input: ID must be a number")
    }

    const resourceId = Number(id)
    const { data, error } = await disableTraining({
      resourceId,
    })

    return { data, error }
  }

  const getAssignedUsers = () => {
    getUsers({ requestPolicy: "network-only" })
  }

  return {
    data: trainingData,
    assignedUserList:
      assignedUserList?.assigned_learning_resourceCollection?.edges.map(
        (item) => {
          const { node } = item
          const { user, completed_at, status_id } = node
          const assignedUser: AssignedUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name ?? "",
            statusId: status_id,
            completionDate: completed_at ? new Date(completed_at) : undefined,
          }

          return assignedUser
        }
      ),
    fetching,
    fetchingUserList,
    addTraining,
    editTraining,
    getAssignedUsers,
    getTraining,
    removeTraining,
  }
}

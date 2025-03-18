"use client"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@urql/next"
import {
  queryGetAssignedUsersByRequirementResource,
  queryGetRequirement,
} from "@/lib/graphql/queries"
import {
  mutationDisableRequirement,
  mutationInsertRequirement,
  mutationUpdateRequirement,
} from "@/lib/graphql/mutations"
import { AssignedUser } from "@/types"

interface RequirementModel {
  id: number
  name: string
  description?: string
  url?: string
  deadline_at?: string
}
export interface RequirementInput {
  name: string
  description?: string
  url?: string
  deadline_at?: string
}

export interface UpdateRequirementInput {
  resourceId: number
  resourceDetails: RequirementInput
}

export const useRequirement = (id: number) => {
  //TODO: handle no ID for add scenarios
  const [requirementData, setRequirementData] =
    useState<RequirementModel | null>(null)

  if (isNaN(id)) {
    throw new Error("Invalid input: ID must be a number")
  }

  const value = Number(id)
  const [{ data: queryData, fetching }, reexecuteGetRequirement] = useQuery({
    query: queryGetRequirement.toString(),
    variables: {
      id: value,
    },
    pause: true, // run query only when needed
  })

  const [{ data: assignedUserList, fetching: fetchingUserList }, getUsers] =
    useQuery({
      query: queryGetAssignedUsersByRequirementResource.toString(),
      variables: {
        resourceId: value,
      },
      pause: true,
    })

  const [, insertRequirement] = useMutation(
    mutationInsertRequirement.toString()
  )
  const [, updateRequirement] = useMutation(
    mutationUpdateRequirement.toString()
  )
  const [, disableRequirement] = useMutation(
    mutationDisableRequirement.toString()
  )

  useEffect(() => {
    if (!queryData || !queryData?.compliance_resourceCollection?.edges) {
      return
    }
    setRequirementData(
      queryData.compliance_resourceCollection.edges[0].node as RequirementModel
    )
  }, [queryData, fetching])

  const getRequirement = () => {
    reexecuteGetRequirement({ requestPolicy: "network-only" })
  }

  const addRequirement = async (input: RequirementInput) => {
    const { data, error } = await insertRequirement({ input })

    return { data, error }
  }

  const editRequirement = async (input: UpdateRequirementInput) => {
    const { data, error } = await updateRequirement({
      resourceId: input.resourceId,
      resourceDetails: input.resourceDetails,
    })

    return { data, error }
  }

  const removeRequirement = async (id: number) => {
    if (isNaN(id)) {
      throw new Error("Invalid input: ID must be a number")
    }

    const resourceId = Number(id)
    const { data, error } = await disableRequirement({ resourceId })

    return { data, error }
  }

  const getAssignedUsers = () => {
    getUsers({ requestPolicy: "network-only" })
  }

  return {
    data: requirementData,
    assignedUserList:
      assignedUserList?.assigned_compliance_resourceCollection?.edges.map(
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
    addRequirement,
    editRequirement,
    getAssignedUsers,
    getRequirement,
    removeRequirement,
  }
}

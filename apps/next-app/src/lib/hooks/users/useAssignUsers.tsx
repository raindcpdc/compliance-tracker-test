import { useClient } from "@urql/next"
import { createClient } from "@/lib/supabase/client"
import { getUnassignedUsers, saveUserAssignments } from "@/lib/supabase/service"
import { AuthenticatedUser, ResourceType } from "@/types"
import {
  queryGetAssignedUsersByRequirementResource,
  queryGetAssignedUsersByTrainingResource,
} from "@/lib/graphql/queries"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

export const useAssignUsers = () => {
  const apiClient = useClient()
  const supabase = createClient(SUPABASE_URL, API_KEY)

  const fetchAssignedTrainingUsers = async (
    resourceId: number
  ): Promise<AuthenticatedUser[] | undefined> => {
    const { data, error } = await apiClient.query(
      queryGetAssignedUsersByTrainingResource.toString(),
      {
        resourceId,
      }
    )

    if (error) {
      console.error("Error fetching assigned training users")
      return
    }

    if (
      data &&
      data.assigned_learning_resourceCollection &&
      data.assigned_learning_resourceCollection.edges
    ) {
      const users = data.assigned_learning_resourceCollection.edges.map(
        (list) => {
          const { node } = list
          const {
            user: { id, first_name, last_name },
          } = node
          return {
            id: id,
            firstName: first_name,
            lastName: last_name,
          } as AuthenticatedUser
        }
      )

      return users
    }

    return
  }

  const fetchAssignedRequirementUsers = async (
    resourceId: number
  ): Promise<AuthenticatedUser[] | undefined> => {
    const { data, error } = await apiClient.query(
      queryGetAssignedUsersByRequirementResource.toString(),
      {
        resourceId,
      }
    )

    if (error) {
      console.error("Error fetching assigned requirement users")
      return
    }

    if (
      data &&
      data.assigned_compliance_resourceCollection &&
      data.assigned_compliance_resourceCollection.edges
    ) {
      const users = data.assigned_compliance_resourceCollection.edges.map(
        (list) => {
          const { node } = list
          const {
            user: { id, first_name, last_name },
          } = node
          return {
            id: id,
            firstName: first_name,
            lastName: last_name,
          } as AuthenticatedUser
        }
      )

      return users
    }

    return
  }

  const fetchUnassignedTrainingUsers = async (resourceId: number) => {
    const data = await getUnassignedUsers(
      supabase,
      ResourceType.Training,
      resourceId
    )
    return data
  }

  const fetchUnassignedRequirementUsers = async (resourceId: number) => {
    const data = await getUnassignedUsers(
      supabase,
      ResourceType.Requirement,
      resourceId
    )
    return data
  }

  const saveUserList = async (
    resourceType: ResourceType,
    resourceId: number,
    newUnassignedUserIds: number[],
    newAssignedUserIds: number[]
  ) => {
    await saveUserAssignments(
      supabase,
      resourceType,
      resourceId,
      newUnassignedUserIds,
      newAssignedUserIds
    )
  }

  return {
    fetchAssignedTrainingUsers,
    fetchAssignedRequirementUsers,
    fetchUnassignedTrainingUsers,
    fetchUnassignedRequirementUsers,
    saveUserList,
  }
}

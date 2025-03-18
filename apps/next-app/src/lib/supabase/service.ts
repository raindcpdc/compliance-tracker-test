// TODO: Which is better, passing the SupabaseClient instance or creating it on each function?

import { AuthenticatedUser, ResourceType } from "@/types"
import { SupabaseClient, User } from "@supabase/supabase-js"

const GET_UNASSIGNED_TRAINING_USERS = "get_unassigned_training_users"
const GET_UNASSIGNED_REQUIREMENT_USERS = "get_unassigned_requirements_users"

/**
 * Retrieves the Supabase custom user associated with the given authenticated user.
 *
 * @param {SupabaseClient} client - The Supabase client instance.
 * @param {User} user - The authenticated Supabase user.
 * @returns The custom user object, null if not found.
 */
export const getSupabaseUser = async (client: SupabaseClient, user: User) => {
  const { data: supabaseUser } = await client
    .from("user")
    .select("id,first_name,last_name,role_id")
    .eq("auth_id", user.id)
    .single()

  return supabaseUser
}

/**
 * Retrieves unassigned users based on resource type and ID.
 *
 * @param {SupabaseClient} client - The Supabase client instance
 * @param {ResourceType} resourceType - The type of resource (Training or Requirement)
 * @param {number} resourceId - The ID of the resource
 * @returns {Promise<AuthenticatedUser[] | undefined>} Array of unassigned users or undefined
 */
export const getUnassignedUsers = async (
  client: SupabaseClient,
  resourceType: ResourceType,
  resourceId: number
): Promise<AuthenticatedUser[] | undefined> => {
  if (resourceType === ResourceType.Training) {
    return await getUnassignedTrainingUsers(client, resourceId)
  }

  return await getUnassignedRequirementUsers(client, resourceId)
}

// Note: @supabase/supabase-js package currently does not support EXCEPT-like query

/**
 * Retrieves users not assigned to a specific training resource using a stored procedure.
 *
 * @param {SupabaseClient} client - The Supabase client instance
 * @param {number} resourceId - The ID of the training resource
 * @returns {Promise<AuthenticatedUser[] | undefined>} Array of unassigned users or undefined
 * @private
 */
const getUnassignedTrainingUsers = async (
  client: SupabaseClient,
  resourceId: number
): Promise<AuthenticatedUser[] | undefined> => {
  const { data, error } = await client.rpc(GET_UNASSIGNED_TRAINING_USERS, {
    training_resource_id: resourceId,
  })

  if (error) {
    throw new Error(
      `Error fetching unassigned training users: ${error.message}`
    )
  }

  if (data) {
    const unassigned = data.map(
      (user: {
        id: number
        first_name: string
        last_name: string
        email: string
      }) => {
        return {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        } as AuthenticatedUser
      }
    )

    return unassigned
  }
}

/**
 * Retrieves users not assigned to a specific requirement resource using a stored procedure.
 *
 * @param {SupabaseClient} client - The Supabase client instance
 * @param {number} resourceId - The ID of the requirement resource
 * @returns {Promise<AuthenticatedUser[] | undefined>} Array of unassigned users or undefined
 * @private
 */
const getUnassignedRequirementUsers = async (
  client: SupabaseClient,
  resourceId: number
): Promise<AuthenticatedUser[] | undefined> => {
  const { data, error } = await client.rpc(GET_UNASSIGNED_REQUIREMENT_USERS, {
    requirement_resource_id: resourceId,
  })

  if (error) {
    throw new Error(
      `Error fetching unassigned training users: ${error.message}`
    )
  }

  if (data) {
    const unassigned = data.map(
      (user: {
        id: number
        first_name: string
        last_name: string
        email: string
      }) => {
        return {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        }
      }
    )

    return unassigned
  }
}

/**
 * Saves user assignments for a specific resource.
 *
 * @param {SupabaseClient} client - The Supabase client instance
 * @param {ResourceType} resourceType - The type of resource (Training or Requirement)
 * @param {number} resourceId - The ID of the resource
 * @param {number[]} newUnassignedUserIds - Array of user IDs to be unassigned
 * @param {number[]} newAssignedUserIds - Array of user IDs to be assigned
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */
export const saveUserAssignments = async (
  client: SupabaseClient,
  resourceType: ResourceType,
  resourceId: number,
  newUnassignedUserIds: number[],
  newAssignedUserIds: number[]
) => {
  const { error } = await client.rpc("save_user_assignments", {
    resource_type: resourceType,
    resource_value: resourceId,
    unassigned_user_ids: newUnassignedUserIds,
    assigned_user_ids: newAssignedUserIds,
  })

  if (error) {
    throw new Error(`Error saving user assignments: ${error.message}`)
  }
}

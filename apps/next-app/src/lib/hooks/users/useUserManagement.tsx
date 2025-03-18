"use client"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@urql/next"
import { queryGetUser } from "@/lib/graphql/queries"
import {
  mutationDisableUser,
  mutationUpdateUser,
} from "@/lib/graphql/mutations"
import { EditUserModel } from "@/types"

export interface UserInput {
  first_name: string
  last_name?: string
  email: string
  role_id: number
  is_active: boolean
}

export interface UpdateUserInput {
  userId: number
  userDetails: UserInput
}

export const useUserManagement = (userId: number) => {
  const [userData, setUserData] = useState<EditUserModel | null>(null)

  const [{ data: queryData, fetching: fetchingUser }, reexecuteQuery] =
    useQuery({
      query: queryGetUser.toString(),
      variables: {
        userId,
      },
      pause: true, // run query only when needed
    })

  const [, deactivateUser] = useMutation(mutationDisableUser.toString())
  const [, updateUser] = useMutation(mutationUpdateUser.toString())

  useEffect(() => {
    if (!queryData || !queryData.userCollection) {
      return
    }

    if (queryData.userCollection.edges.length > 0) {
      const rawData = queryData.userCollection.edges[0].node
      const user: EditUserModel = {
        id: rawData.id,
        firstName: rawData.first_name,
        lastName: rawData.last_name ?? "",
        email: rawData.email,
        roleId: rawData.user_role.id.toString(),
        isActive: rawData.is_active ?? false,
      }
      setUserData(user)
    }
  }, [queryData, fetchingUser])

  const fetchUser = () => {
    reexecuteQuery({ requestPolicy: "network-only" })
  }

  const disableUser = async (id: number) => {
    if (isNaN(id)) {
      throw new Error("Invalid input: ID must be a number")
    }

    const userId = Number(id)
    const { data, error } = await deactivateUser({
      userId,
    })

    return { data, error }
  }

  const editUser = async (input: UpdateUserInput) => {
    const { data, error } = await updateUser({
      userId: input.userId,
      userDetails: input.userDetails,
    })

    return { data, error }
  }

  return {
    userData,
    disableUser,
    editUser,
    fetchUser,
    fetchingUser,
  }
}

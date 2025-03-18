import { useQuery } from "@urql/next"
import { queryGetAllUsers } from "@/lib/graphql/queries"

export const useUsersManagement = () => {
  // const apiClient = useClient()

  const [
    { data, error: errorFetchingUserList, fetching: fetchingUserList },
    refetchList,
  ] = useQuery({
    query: queryGetAllUsers.toString(),
  })

  const fetchUsers = () => {
    refetchList({ requestPolicy: "network-only" })
  }

  return {
    userList: data?.userCollection?.edges,
    errorFetchingUserList,
    fetchingUserList,
    fetchUsers,
  }
}

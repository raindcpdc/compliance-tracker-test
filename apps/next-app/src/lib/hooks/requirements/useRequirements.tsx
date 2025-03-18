import { useQuery } from "@urql/next"
import {
  queryGetRequirementList,
  queryGetRequirements,
} from "@/lib/graphql/queries"

export const useRequirements = (isActiveOnly?: boolean) => {
  const [
    {
      data: listWithDetails,
      error: errorFetchingListWithDetails,
      fetching: fetchingListWithDetails,
    },
    refetchListWithDetails,
  ] = useQuery({
    query: queryGetRequirements.toString(),
    variables: {
      isActive: isActiveOnly,
    },
  })

  const [
    { data: list, error: errorFetchingList, fetching: fetchingList },
    refetchList,
  ] = useQuery({
    query: queryGetRequirementList.toString(),
    pause: true,
  })

  const fetchList = () => {
    refetchList({ requestPolicy: "network-only" })
  }

  const fetchListWithDetails = () => {
    refetchListWithDetails({ requestPolicy: "network-only" })
  }

  return {
    requirementList: list?.compliance_resourceCollection?.edges,
    requirementListWithDetails:
      listWithDetails?.compliance_resourceCollection?.edges,
    errorFetchingList,
    errorFetchingListWithDetails,
    fetchList,
    fetchListWithDetails,
    fetchingList,
    fetchingListWithDetails,
  }
}

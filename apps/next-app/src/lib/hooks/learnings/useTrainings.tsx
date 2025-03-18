import { useQuery } from "@urql/next"
import { queryGetTrainingList, queryGetTrainings } from "@/lib/graphql/queries"

export const useTrainings = (isMandatory?: boolean) => {
  const [
    {
      data: listWithDetails,
      error: errorFetchingListWithDetails,
      fetching: fetchingListWithDetails,
    },
    refetchListWithDetails,
  ] = useQuery({
    query: queryGetTrainings.toString(),
    variables: {
      isMandatory: isMandatory,
    },
  })

  const [
    { data: list, error: errorFetchingList, fetching: fetchingList },
    refetchList,
  ] = useQuery({
    query: queryGetTrainingList.toString(),
    pause: true,
  })

  const fetchList = () => {
    refetchList({ requestPolicy: "network-only" })
  }

  const fetchListWithDetails = () => {
    refetchListWithDetails({ requestPolicy: "network-only" })
  }

  return {
    trainingList: list?.learning_resourceCollection?.edges,
    trainingListWithDetails:
      listWithDetails?.learning_resourceCollection?.edges,
    errorFetchingList,
    errorFetchingListWithDetails,
    fetchList,
    fetchingListWithDetails,
    fetchingList,
    fetchListWithDetails,
  }
}

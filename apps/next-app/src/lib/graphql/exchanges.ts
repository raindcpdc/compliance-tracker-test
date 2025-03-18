import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from "@urql/next"

export const ssr = ssrExchange({
  isClient: typeof window === "undefined",
})

export const initGraphqlClient = () => {
  return (url: string, key: string) => {
    return createClient({
      url,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
      fetchOptions: () => {
        return {
          headers: {
            "Content-Type": "application/json",
            apiKey: key,
          },
        }
      },
    })
  }
}

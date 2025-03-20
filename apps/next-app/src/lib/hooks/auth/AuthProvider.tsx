"use client"

import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { UrqlProvider } from "@urql/next"
import { UserRoleLabel, UserRoleType } from "@/constants"
import { initGraphqlClient, ssr } from "@/lib/graphql/exchanges"
import { createClient } from "@/lib/supabase/client"
import { getSupabaseUser } from "@/lib/supabase/service"
import { AuthenticatedUser } from "@/types"

interface GraphqlClientProviderProps {
  children: React.ReactNode
  url: string
  apiKey: string
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthUserProviderProps {
  children: React.ReactNode
  apiKey: string
  url: string
}

interface AuthUserContextProps {
  authUser: AuthenticatedUser | null
  isManager: boolean
  isLoggedIn: boolean
}

const AuthUserContext = createContext<AuthUserContextProps>({
  authUser: null,
  isManager: false,
  isLoggedIn: false,
})

const createGraphqlClient = initGraphqlClient()

export const UrqlClientProvider = ({
  children,
  apiKey,
  url,
}: GraphqlClientProviderProps) => {
  const client = useMemo(() => {
    return createGraphqlClient(url, apiKey)
  }, [apiKey, url])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}

export const AuthUserProvider = ({
  children,
  apiKey,
  url,
}: AuthUserProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null)
  const [isManager, setIsManager] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient(url, apiKey)

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const supabaseUser = await getSupabaseUser(supabase, user)
        const roleType = supabaseUser
          ? (supabaseUser.role_id as UserRoleType)
          : UserRoleType.IC
        const authenticatedUser: AuthenticatedUser = {
          id: supabaseUser ? supabaseUser.id : 0,
          role: {
            id: roleType,
            name: UserRoleLabel[roleType],
          },
          email: user.email?.toLowerCase() ?? "",
          firstName: user.user_metadata.full_name,
          lastName: user.user_metadata.last_name ?? "",
          avatarUrl: user.user_metadata.avatar_url ?? "",
        }
        setAuthUser(authenticatedUser)

        //TODO: feature flags
        setIsManager(roleType === UserRoleType.Manager)
        setIsLoggedIn(true)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setAuthUser(null)
        router.push("/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <AuthUserContext.Provider value={{ authUser, isManager, isLoggedIn }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const AuthProvider = memo(({ children }: AuthProviderProps) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
  if (!SUPABASE_URL || !API_KEY) {
    throw new Error("URL or key not set")
  }

  const graphqlUrl = `${SUPABASE_URL}/graphql/v1`

  return (
    <AuthUserProvider url={SUPABASE_URL} apiKey={API_KEY}>
      <UrqlClientProvider url={graphqlUrl} apiKey={API_KEY}>
        {children}
      </UrqlClientProvider>
    </AuthUserProvider>
  )
})
AuthProvider.displayName = "AuthProvider"

export const useAuth = () => {
  return useContext(AuthUserContext)
}

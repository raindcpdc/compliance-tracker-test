import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

/**
 * Creates a server-side Supabase client that handles cookies automatically.
 *
 * @param {string} url - The Supabase URL.
 * @param {string} key - The Supabase API key.
 * @returns {SupabaseClient} A Supabase client.
 */
export const createClient = async (url: string, key: string) => {
  const cookieStore = await cookies()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

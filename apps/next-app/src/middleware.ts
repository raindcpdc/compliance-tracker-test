import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { getSupabaseUser } from "./lib/supabase/service"
import { UserRoleType } from "./constants"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

const updateSession = async (request: NextRequest) => {
  if (!SUPABASE_URL || !API_KEY) {
    throw new Error("URL or key not set")
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(SUPABASE_URL, API_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if the session has expired
  //! Supabase's free tier doesn't allow updating the session settings (ie. timeout)
  if (user && session?.expires_at) {
    const expirationTime = new Date(session.expires_at * 1000) // Convert to milliseconds
    if (expirationTime <= new Date()) {
      // Session has expired, sign out the user
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  const pathname = request.nextUrl.pathname

  // If the user is not signed in and the current path is not /login or /auth/callback,
  // redirect the user to /login
  if (
    !user &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (user && (pathname === "/" || pathname === "/login")) {
    const authUser = await getSupabaseUser(supabase, user)

    if (authUser?.role_id == UserRoleType.Manager)
      return NextResponse.redirect(new URL("/dashboard", request.url))
    else
      return NextResponse.redirect(
        new URL("/requirements/assigned", request.url)
      )
  }

  return supabaseResponse
}

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

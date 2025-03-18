"use server"

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const SUPABASE_URL = process.env.SUPABASE_URL!
const KEY = process.env.SUPABASE_API_KEY!

/**
 * Handles the GET request for the authentication callback that contains the "code" parameter.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET(request: Request) {
  if (!SUPABASE_URL || !KEY) {
    return NextResponse.redirect("/auth/env-error")
  }
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient(SUPABASE_URL, KEY)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const ENV = process.env.ENVIRONMENT!
const AUTH_CALLBACK_URL = ENV === 'production'
? 'https://mandatory-tracker-test.netlify.app/auth/callback'
: 'http://localhost:3000/auth/callback'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

export const signInWithGithub = async () => {
  if (!SUPABASE_URL || !AUTH_CALLBACK_URL || !KEY) {
    throw new Error("URLs or key not set")
  }

  const supabase = await createClient(SUPABASE_URL, KEY)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: AUTH_CALLBACK_URL
    },
  })

  if (error) {
    throw new Error("Error signing in: " + error.message)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export const signOut = async () => {
  if (!SUPABASE_URL || !KEY) {
    throw new Error("URL or key not set")
  }

  const supabase = await createClient(SUPABASE_URL, KEY)
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error("Error signing out: " + error.message)
  }

  redirect("/login")
}

"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const AUTH_CALLBACK_URL = process.env.NEXT_PUBLIC_AUTH_CALLBACK!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const signInWithGithub = async () => {
  if (!SUPABASE_URL || !AUTH_CALLBACK_URL || !KEY) {
    throw new Error("URLs or key not set")
  }

  const supabase = await createClient(SUPABASE_URL, KEY)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: AUTH_CALLBACK_URL,
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

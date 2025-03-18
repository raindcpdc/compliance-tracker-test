"use client"
import { createBrowserClient } from "@supabase/ssr"

/**
 * Creates a Supabase client that is safe to use on the client.
 *
 * @param {string} url - The Supabase URL.
 * @param {string} key - The Supabase API key.
 * @returns {SupabaseClient} A Supabase client.
 */
export const createClient = (url: string, key: string) => {
  return createBrowserClient(url, key)
}

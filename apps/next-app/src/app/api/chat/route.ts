import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"

import { presetMemory } from "./lib/memory"

// @note @todo Add tooling capabilities for EllenAI
// @note Checkout https://sdk.vercel.ai/docs/foundations/tools
export async function POST(req: Request) {
  const OPEN_AI_KEYS = process.env.OPENAI_API_KEY

  if (!OPEN_AI_KEYS) {
    return new Response("OpenAI API key is not suplied", {
      status: 500,
    })
  }

  const openai = createOpenAI({
    apiKey: OPEN_AI_KEYS,
  })

  const { messages } = await req.json()

  const conversationWithPresetMemory = [
    {
      role: "system",
      content: presetMemory,
    },
    ...messages,
  ]

  const result = streamText({
    model: openai("gpt-4o"),
    messages: conversationWithPresetMemory,
  })
  return result.toDataStreamResponse()
}

import "./envConfig.ts"
import type { CodegenConfig } from "@graphql-codegen/cli"

const API_KEY = process.env.SUPABASE_API_KEY as string

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://rjtezqqbmcpujhvadccw.supabase.co/graphql/v1": {
        headers: {
          apiKey: API_KEY,
        },
      },
    },
  ],
  documents: ["src/lib/graphql/queries.ts", "src/lib/graphql/mutations.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/lib/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
        skipTypename: true,
      },
    },
  },
}

export default config

import "./envConfig.ts"
import type { CodegenConfig } from "@graphql-codegen/cli"

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdGV6cXFibWNwdWpodmFkY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NTYxNjQsImV4cCI6MjA0OTAzMjE2NH0.HnKiGAbAGPF8lcOw7XJcZRndGIpWIqF48E2mSpZHbmE'

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

import type { Preview } from "@storybook/react"
import "../src/app/globals.css"

const preview: Preview = {
  // 📜 Enables auto-generated documentation for all stories
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

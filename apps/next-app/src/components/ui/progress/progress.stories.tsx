import { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  args: {
    value: 50, // Default progress value
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ProgressAt25: Story = {
  args: {
    value: 25,
  },
}

export const ProgressAt75: Story = {
  args: {
    value: 75,
  },
}

export const FullProgress: Story = {
  args: {
    value: 100,
  },
}

export const NoProgress: Story = {
  args: {
    value: 0,
  },
}

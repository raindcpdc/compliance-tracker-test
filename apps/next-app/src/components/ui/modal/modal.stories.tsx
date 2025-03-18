import type { Meta, StoryObj } from "@storybook/react"
import { Modal as UIModal } from "./modal"
import { Button } from "../button"

const meta: Meta<typeof UIModal> = {
  title: "UI/Modal",
  component: UIModal,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Content",
    description: "Description",
    title: "Title",
    trigger: <Button>Open</Button>,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Modal: Story = {}

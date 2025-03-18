import { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layoyout: "centered",
  },
  args: {
    type: "text",
    placeholder: "Enter your name",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "date"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// 📓 @note Handling different states
export const PasswordInput: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
    value: "password",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    type: "text",
    placeholder: "Enter name",
    value: "",
  },
}

export const WithCustomStyles: Story = {
  args: {
    className: "border-2 border-red-500 focus-visible:ring-red-500",
    placeholder: "Enter your name",
  },
}

export const Email: Story = {
  args: {
    placeholder: "Enter your email",
    type: "email",
  },
}

export const Date: Story = {
  args: {
    placeholder: "Enter your date of birth",
    type: "date",
    value: "2024-09-16",
    className:
      "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50",
  },
}

import type { Meta, StoryObj } from '@storybook/react';
import {Button as UIButton} from "@/components/ui/button";

const meta: Meta<typeof UIButton> = {
  title: "UI/Button",
  component: UIButton,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Sample Button",
    variant: "default",
  },
  argTypes: {
    variant: {
      defaultValue: "default",
      options: ["default", "outline", "secondary", "ghost", "link"],
      control: { type: "radio" },
    },
    size: {
      defaultValue: "default",
      options: ["default", "sm", "lg", "icon"],
      control: { type: "radio" },
    },
  }
}

export default meta
type Story = StoryObj<typeof meta>


export const Button: Story = {
}

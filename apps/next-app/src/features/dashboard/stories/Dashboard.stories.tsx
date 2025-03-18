import { Meta, StoryObj } from '@storybook/react'

import UIDashboard from "@/features/dashboard"
import { Employee } from '@/types'

import { employeeData } from '../mocks'

const meta: Meta<typeof UIDashboard> = {
  title: "Components/Dashboard",
  component: UIDashboard,
  parameters: {
    layout: "centered",
  },
  args: {
    data: employeeData as Employee[],
  }
}

export default meta
type Story = StoryObj<typeof meta>
export const Dashboard: Story = {}
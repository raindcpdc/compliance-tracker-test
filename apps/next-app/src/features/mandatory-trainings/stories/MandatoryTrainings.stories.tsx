//TODO: fix mocking data
import { Meta, StoryObj } from "@storybook/react"
import { MandatoryTrainings as UIMandatoryTrainings } from "@/features/mandatory-trainings/"

const trainingData = [
  {
    id: 1,
    name: "Frontend Basics",
    description: "Essential frontend development concepts",
    dueDate: "6/30/2024",
    status: "Not Started",
  },
  {
    id: 2,
    name: "React Advanced",
    description: "Advanced React patterns and best practices",
    dueDate: "7/31/2024",
    status: "Completed",
  },
  {
    id: 3,
    name: "TypeScript Fundamentals",
    description: "Core TypeScript concepts for frontend development",
    dueDate: "8/31/2024",
    status: "Not Started",
  },
  {
    id: 4,
    name: "Web Accessibility",
    description: "Creating accessible web applications",
    dueDate: "9/30/2024",
    status: "Not Started",
  },
  {
    id: 5,
    name: "Performance Optimization",
    description: "Techniques for optimizing frontend performance",
    dueDate: "10/31/2024",
    status: "Not Started",
  },
]

const meta: Meta<typeof UIMandatoryTrainings> = {
  title: "Components/Trainings/Mandatory Trainings",
  component: UIMandatoryTrainings,
  parameters: {
    layout: "centered",
  },
  args: {
    trainings: trainingData,
  },
}

export default meta
type Story = StoryObj<typeof meta>
export const MandatoryTrainings: Story = {}

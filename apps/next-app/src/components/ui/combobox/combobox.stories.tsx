import type { Meta, StoryObj } from "@storybook/react"
import { Combobox as UICombobox } from "./combobox"
import { CircleCheckBig, CirclePlay, Info } from "lucide-react"

const mockData = [
  {
    value: "1",
    label: "Not Started",
    icon: <Info className="text-gray-500" />,
  },
  {
    value: "2",
    label: "Start Training",
    icon: <CirclePlay className="text-orange-500" />,
  },
  {
    value: "3",
    label: "Mark as Completed",
    icon: <CircleCheckBig className="text-green-500" />,
  },
]

const meta: Meta<typeof UICombobox> = {
  title: "UI/Combobox",
  component: UICombobox,
  parameters: {
    layout: "centered",
  },
  args: {
    enableSearch: true,
    placeholder: "Manage Training",
    inputPlaceholder: "Search...",
    itemNotFoundMessage: "Status not found",
    items: mockData,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Combobox: Story = {}

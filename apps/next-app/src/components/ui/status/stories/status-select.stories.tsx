import type { Meta, StoryObj } from "@storybook/react"
import { StatusSelect as UIStatusSelect } from "@/components/ui/status/"
import { ResourceStatus,StatusChangeLabel } from "@/constants"

const meta: Meta<typeof UIStatusSelect> = {
  title: "UI/Status/StatusSelect",
  component: UIStatusSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    assignedId: StatusChangeLabel[ResourceStatus.NOT_STARTED],
    placeholder: "Select Status",
    currentStatus: ResourceStatus.NOT_STARTED,
  },
  argTypes: {
    currentStatus: {
      description: "ResourceStatus ID, affects the items to be displayed",
      control: {
        type: "select",
      },
      options: [
        StatusChangeLabel[ResourceStatus.NOT_STARTED],
        StatusChangeLabel[ResourceStatus.IN_PROGRESS],
        StatusChangeLabel[ResourceStatus.COMPLETED],
      ],
      mapping: {
        [StatusChangeLabel[ResourceStatus.NOT_STARTED]]: ResourceStatus.NOT_STARTED,
        [StatusChangeLabel[ResourceStatus.IN_PROGRESS]]: ResourceStatus.IN_PROGRESS,
        [StatusChangeLabel[ResourceStatus.COMPLETED]]: ResourceStatus.COMPLETED,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const StatusSelect: Story = {}

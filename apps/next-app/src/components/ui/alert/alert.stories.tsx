import { Meta, StoryObj } from '@storybook/react';

import { Alert as UIAlert } from "@/components/ui/alert";

const meta: Meta<typeof UIAlert> = {
    title: "UI/Alert",
    component: UIAlert,
    parameters: {
        layout: "centered",
    },
    args: {
        children: "Sample Alert",
        variant: "default",
    },
    argTypes: {
        variant: {
            defaultValue: "default",
        }
    }
}


export default meta
type Story = StoryObj<typeof meta>

export const Alert: Story = {}
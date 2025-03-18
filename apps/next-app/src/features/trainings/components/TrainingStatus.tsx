"use client"
import { ResourceStatus, StatusLabel } from "@/constants"
import { Button } from "@/components/ui/button"

interface TrainingStatusProps {
  id: number
}

export default function TrainingStatus({ id }: TrainingStatusProps) {
  const DisplayTrainingStatus = (id: number) => {
    switch (id) {
      case ResourceStatus.NOT_STARTED:
        return (
          <Button
            variant="destructive"
            size="sm"
            className="rounded-full cursor-default"
          >
            {StatusLabel[ResourceStatus.NOT_STARTED]}
          </Button>
        )
      case ResourceStatus.IN_PROGRESS:
        return (
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-orange-400 cursor-default"
          >
            {StatusLabel[ResourceStatus.IN_PROGRESS]}
          </Button>
        )
      case ResourceStatus.COMPLETED:
        return (
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-lime-500 cursor-default"
          >
            {StatusLabel[ResourceStatus.COMPLETED]}
          </Button>
        )
      default:
        return null
    }
  }
  return <>{DisplayTrainingStatus(id)}</>
}

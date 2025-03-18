import { ResourceStatus, StatusLabel } from "@/constants"
import { Button } from "@/components/ui/button"

interface StatusButtonProps {
  statusId: ResourceStatus
}

export default function StatusButton({ statusId }: StatusButtonProps) {
  const DisplayStatus = (statusId: ResourceStatus) => {
    switch (statusId) {
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
  return <>{DisplayStatus(statusId)}</>
}

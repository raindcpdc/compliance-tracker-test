import { CircleCheckBig, CirclePlay, Info } from "lucide-react"
import { ResourceStatus, StatusChangeLabel } from "@/constants"
import { Combobox } from "@/components/ui/combobox"

interface StatusSelectProps {
  assignedId: string
  placeholder: string
  currentStatus: ResourceStatus
  onStatusChange: (id: string, status: string) => void
}

export default function StatusSelect({
  assignedId,
  currentStatus,
  placeholder,
  onStatusChange,
}: StatusSelectProps) {
  const GetStatuslist = (currentStatus: ResourceStatus) => {
    switch (currentStatus) {
      case ResourceStatus.NOT_STARTED:
        return [
          {
            value: ResourceStatus.IN_PROGRESS.toString(),
            label: StatusChangeLabel[ResourceStatus.IN_PROGRESS],
            icon: <CirclePlay className="text-orange-500" />,
          },
          {
            value: ResourceStatus.COMPLETED.toString(),
            label: StatusChangeLabel[ResourceStatus.COMPLETED],
            icon: <CircleCheckBig className="text-green-500" />,
          },
        ]
      case ResourceStatus.IN_PROGRESS:
        return [
          {
            value: ResourceStatus.NOT_STARTED.toString(),
            label: StatusChangeLabel[ResourceStatus.NOT_STARTED],
            icon: <Info className="text-gray-500" />,
          },
          {
            value: ResourceStatus.COMPLETED.toString(),
            label: StatusChangeLabel[ResourceStatus.COMPLETED],
            icon: <CircleCheckBig className="text-green-500" />,
          },
        ]
      default:
        return [
          {
            value: ResourceStatus.NOT_STARTED.toString(),
            label: StatusChangeLabel[ResourceStatus.NOT_STARTED],
            icon: <Info className="text-gray-500" />,
          },
          {
            value: ResourceStatus.IN_PROGRESS.toString(),
            label: StatusChangeLabel[ResourceStatus.IN_PROGRESS],
            icon: <CirclePlay className="text-orange-500" />,
          },
        ]
    }
  }

  const handleStatusChange = (status: string) => {
    onStatusChange(assignedId, status)
  }

  return (
    <Combobox
      key={assignedId}
      items={GetStatuslist(currentStatus)}
      placeholder={placeholder || "Select"}
      onItemSelected={handleStatusChange}
    />
  )
}

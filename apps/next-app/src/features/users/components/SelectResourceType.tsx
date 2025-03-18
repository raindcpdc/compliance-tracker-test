import { ResourceType } from "@/types"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectResourceTypeProps {
  onSelect: (value: ResourceType) => void
}

const SelectResourceType = ({ onSelect }: SelectResourceTypeProps) => {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="resourceType">
          Type<span className="text-destructive">*</span>
        </Label>
        <Select
          onValueChange={onSelect}
          defaultValue={ResourceType.Requirement}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ResourceType.Requirement}>
                Requirement
              </SelectItem>
              <SelectItem value={ResourceType.Training}>Training</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default SelectResourceType

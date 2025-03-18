import { useCallback, useEffect, useState } from "react"
import { useClient } from "@urql/next"
import {
  queryGetRequirementList,
  queryGetTrainingList,
} from "@/lib/graphql/queries"
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

interface SelectResourceProps {
  mode: ResourceType
  onSelect: (value: string) => void
}

type ItemList = {
  id: string
  text: string
}

const SelectResource = ({ mode, onSelect }: SelectResourceProps) => {
  const apiClient = useClient()

  const [items, setItemList] = useState<ItemList[]>([])

  const loadTrainingList = useCallback(async () => {
    const { data, error } = await apiClient.query(
      queryGetTrainingList.toString(),
      {}
    )

    if (error) {
      console.error("Error fetching training list")
      return
    }

    const trainingList: ItemList[] = []
    const list = data?.learning_resourceCollection?.edges
    if (list) {
      list.forEach((item) => {
        const { node } = item
        trainingList.push({
          id: node.id.toString(),
          text: node.name,
        })
      })
    }

    setItemList(trainingList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadRequirementList = useCallback(async () => {
    const { data, error } = await apiClient.query(
      queryGetRequirementList.toString(),
      {}
    )

    if (error) {
      console.error("Error fetching requirement list")
      return
    }

    const requirementList: ItemList[] = []
    const list = data?.compliance_resourceCollection?.edges
    if (list) {
      list.forEach((item) => {
        const { node } = item
        requirementList.push({
          id: node.id.toString(),
          text: node.name,
        })
      })
    }

    setItemList(requirementList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mode === ResourceType.Training) {
      loadTrainingList()
    } else {
      loadRequirementList()
    }
  }, [loadRequirementList, loadTrainingList, mode])
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="resourceName">
          Requirement / Training
          <span className="text-destructive">*</span>
        </Label>
        <Select onValueChange={onSelect}>
          <SelectTrigger id="resourceName">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default SelectResource

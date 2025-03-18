"use client"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SelectResourceType from "./SelectResourceType"
import SelectResource from "./SelectResource"
import UserTable from "./UserTable"
import { useAssignUsers } from "@/lib/hooks/users"
import {
  AuthenticatedUser,
  ResourceType,
  UserAssignmentModel,
  userAssignmentSchema,
} from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const AssignUsers = () => {
  const methods = useForm<UserAssignmentModel>({
    resolver: zodResolver(userAssignmentSchema),
    defaultValues: {
      movedToAssigned: [],
      movedToUnassigned: [],
    },
  })
  const {
    formState: { isDirty },
    reset,
    setValue,
  } = methods

  const {
    fetchAssignedRequirementUsers,
    fetchAssignedTrainingUsers,
    fetchUnassignedRequirementUsers,
    fetchUnassignedTrainingUsers,
    saveUserList,
  } = useAssignUsers()

  const [selectedResourceType, setResourceType] = useState<ResourceType>(
    ResourceType.Requirement
  )
  const [selectedResource, setSelectedResource] = useState(0)
  const [availableUsers, setAvailableUsers] = useState<AuthenticatedUser[]>([])
  const [assignedUsers, setAssignedUsers] = useState<AuthenticatedUser[]>([])
  const [selectedAvailable, setSelectedAvailable] = useState<Set<number>>(
    new Set()
  )
  const [selectedAssigned, setSelectedAssigned] = useState<Set<number>>(
    new Set()
  )
  const [originalAssignedIds, setOriginalAssignedIds] = useState<Set<number>>(
    new Set()
  )
  const [originalAvailableIds, setOriginalAvailableIds] = useState<Set<number>>(
    new Set()
  )

  const moveToAssigned = () => {
    const usersToMove = availableUsers.filter((user) =>
      selectedAvailable.has(user.id)
    )
    setAssignedUsers([...assignedUsers, ...usersToMove])
    setAvailableUsers(
      availableUsers.filter((user) => !selectedAvailable.has(user.id))
    )
    setSelectedAvailable(new Set())
  }

  const moveToAvailable = () => {
    const usersToMove = assignedUsers.filter((user) =>
      selectedAssigned.has(user.id)
    )
    setAvailableUsers([...availableUsers, ...usersToMove])
    setAssignedUsers(
      assignedUsers.filter((user) => !selectedAssigned.has(user.id))
    )
    setSelectedAssigned(new Set())
  }

  const handleAddAllUsers = () => {
    setAssignedUsers([...assignedUsers, ...availableUsers])
    setAvailableUsers([])
    setSelectedAvailable(new Set())
  }

  const handleRemoveAllUsers = () => {
    setAvailableUsers([...availableUsers, ...assignedUsers])
    setAssignedUsers([])
    setSelectedAssigned(new Set())
  }

  const handleResourceTypeSelection = (value: ResourceType) => {
    //TODO: fix resource dropdown selection when changing type
    setResourceType(value)
    // setSelectedResource(0)
    reset()
  }

  const handleResourceSelection = (resourceId: string) => {
    const value = Number(resourceId)
    setSelectedResource(value)
    reset()
  }

  const getRequirementUsers = async (resourceId: number) => {
    const assigned = await fetchAssignedRequirementUsers(resourceId)
    const unassigned = await fetchUnassignedRequirementUsers(resourceId)

    if (unassigned) {
      setAvailableUsers(unassigned)
      setOriginalAvailableIds(new Set(unassigned.map((user) => user.id)))
    }
    if (assigned) {
      setAssignedUsers(assigned)
      setOriginalAssignedIds(new Set(assigned.map((user) => user.id)))
    }
  }

  const getTrainingUsers = async (resourceId: number) => {
    const assigned = await fetchAssignedTrainingUsers(resourceId)
    const unassigned = await fetchUnassignedTrainingUsers(resourceId)

    if (unassigned) {
      setAvailableUsers(unassigned)
      setOriginalAvailableIds(new Set(unassigned.map((user) => user.id)))
    }
    if (assigned) {
      setAssignedUsers(assigned)
      setOriginalAssignedIds(new Set(assigned.map((user) => user.id)))
    }
  }

  // TODO: implement restore to defaults
  const onCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reset()
  }

  const onSubmit = async (data: UserAssignmentModel) => {
    const { movedToUnassigned, movedToAssigned } = data

    const unAssignedUsersSet = new Set(movedToUnassigned)
    const newUnassignedUserIds =
      unAssignedUsersSet.difference(originalAvailableIds)

    const assignedUsersSet = new Set(movedToAssigned)
    const newAssignedUserIds = assignedUsersSet.difference(originalAssignedIds)

    if (!isDirty) {
      toast.info("No changes made")
      return
    }

    try {
      await saveUserList(
        selectedResourceType,
        selectedResource,
        [...newUnassignedUserIds],
        [...newAssignedUserIds]
      )

      setOriginalAvailableIds(new Set(movedToUnassigned))
      setOriginalAssignedIds(new Set(movedToAssigned))
      reset()
      toast.info("Users assigned successfully")
    } catch {
      toast.error("Error assigning users")
    }
  }

  useEffect(() => {
    if (!selectedResourceType || !selectedResource) return

    switch (selectedResourceType) {
      case ResourceType.Requirement:
        getRequirementUsers(selectedResource)
        return

      case ResourceType.Training:
        getTrainingUsers(selectedResource)
        return

      default:
        return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResourceType, selectedResource])

  useEffect(() => {
    setValue(
      "movedToUnassigned",
      Array.from(availableUsers.map((user) => user.id))
    )
    setValue(
      "movedToAssigned",
      Array.from(assignedUsers.map((user) => user.id))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableUsers, assignedUsers])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-full max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Requirement / Training Selection</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <SelectResourceType onSelect={handleResourceTypeSelection} />
              <div className="col-span-2">
                <SelectResource
                  mode={selectedResourceType}
                  onSelect={handleResourceSelection}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-6 mt-10">
            <div className="flex-1">
              <UserTable
                fieldName="movedToUnassigned"
                users={availableUsers}
                title="All Users"
                selected={selectedAvailable}
                onSelect={setSelectedAvailable}
                onAddAll={(e) => {
                  e.preventDefault()
                  handleAddAllUsers()
                }}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <Button
                variant="default"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  moveToAssigned()
                }}
                disabled={selectedAvailable.size === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  moveToAvailable()
                }}
                disabled={selectedAssigned.size === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <UserTable
                fieldName="movedToAssigned"
                users={assignedUsers}
                title="Assigned Users"
                selected={selectedAssigned}
                onSelect={setSelectedAssigned}
                onRemoveAll={(e) => {
                  e.preventDefault()
                  handleRemoveAllUsers()
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default AssignUsers

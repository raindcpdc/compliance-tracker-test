"use client"
import { useEffect, useState } from "react"
import { UpdateUserInput, useUserManagement } from "@/lib/hooks/users"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { EditUserModel, editUserSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRoleLabel, UserRoleType } from "@/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface UpdateUserProps {
  id: number
  trigger: React.ReactNode
  onUpdateSuccess?: (message?: string) => void
  onUpdateError?: (errorMesaage?: string) => void
}

const UpdateUser = (props: UpdateUserProps) => {
  const { id: userId, trigger, onUpdateSuccess, onUpdateError } = props
  const { userData, editUser, fetchUser } = useUserManagement(userId)

  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<EditUserModel>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      id: userId,
      firstName: "",
      lastName: "",
      email: "",
      roleId: UserRoleType.IC.toString(),
      isActive: true,
    },
  })

  const { control, handleSubmit } = form

  useEffect(() => {
    if (userData && isOpen) {
      form.reset(userData)
    }
  }, [userData, form, isOpen])

  const handleOpenChange = (isModalOpen: boolean) => {
    if (isModalOpen) {
      fetchUser()
    }
    setIsOpen(isModalOpen)
  }

  const onSubmit = async (data: EditUserModel) => {
    const input: UpdateUserInput = {
      userId: data.id,
      userDetails: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        role_id: Number(data.roleId),
        is_active: data.isActive,
      },
    }

    const { data: editedData, error } = await editUser(input)
    if (error) {
      if (onUpdateError) {
        const fullName = data.lastName
          ? `${data.firstName} ${data.lastName}`
          : data.firstName
        onUpdateError(`Failed to update user ${fullName} user account`)
      }
      setIsOpen(false)
      return
    }

    if (editedData && editedData.updateuserCollection) {
      if (editedData.updateuserCollection.affectedCount > 0) {
        if (onUpdateSuccess) {
          onUpdateSuccess()
        }
      } else {
        if (onUpdateError) {
          onUpdateError("User not found, no changes made.")
        }
      }

      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="roleId"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRoleType.Manager.toString()}>
                        {UserRoleLabel[UserRoleType.Manager]}
                      </SelectItem>
                      <SelectItem value={UserRoleType.IC.toString()}>
                        {UserRoleLabel[UserRoleType.IC]}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="isActive"
              control={control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is Active?</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 text-white"
                variant="outline"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateUser

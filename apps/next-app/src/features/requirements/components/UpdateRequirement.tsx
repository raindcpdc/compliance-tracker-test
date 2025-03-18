"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  UpdateRequirementInput,
  useRequirement,
} from "@/lib/hooks/requirements"
import { cn } from "@/lib/utils"
import { EditRequirementModel, editRequirementSchema } from "@/types"
import { Button } from "@/components/ui/button"
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface UpdateRequirementProps {
  id: number
  trigger: React.ReactNode
  onUpdateSuccess?: (message?: string) => void
  onUpdateError?: (errorMesaage?: string) => void
}

const UpdateRequirement = (props: UpdateRequirementProps) => {
  const { id, trigger, onUpdateSuccess, onUpdateError } = props
  const { data, editRequirement, getRequirement } = useRequirement(id)
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<EditRequirementModel>({
    resolver: zodResolver(editRequirementSchema),
    defaultValues: {
      id: id.toString(),
      name: "",
      description: "",
      url: "",
      dueDate: undefined,
    },
  })

  const { control, handleSubmit } = form

  useEffect(() => {
    if (data && isOpen) {
      form.reset({
        id: id.toString(),
        name: data.name,
        description: data.description,
        url: data.url,
        dueDate: data.deadline_at ? new Date(data.deadline_at) : undefined,
      })
    }
  }, [id, data, form, isOpen])

  const handleOpenChange = (isModalOpen: boolean) => {
    if (isModalOpen) {
      getRequirement()
    }
    setIsOpen(isModalOpen)
  }

  const onSubmit = async (values: EditRequirementModel) => {
    //TODO: handle client side errors
    const { name, description, url, dueDate } = values
    const input: UpdateRequirementInput = {
      resourceId: id,
      resourceDetails: {
        name: name,
        description: description,
        url: url,
        deadline_at: dueDate ? new Date(dueDate).toISOString() : undefined,
      },
    }

    const { data: editedData, error } = await editRequirement(input)

    if (error) {
      console.error(`add error : ${error.name}: ${error.message}`)
      if (onUpdateError) {
        onUpdateError()
      }
      setIsOpen(false)
      return
    }

    if (editedData && editedData.updatecompliance_resourceCollection) {
      if (onUpdateSuccess) {
        onUpdateSuccess()
      }
      setIsOpen(false)
    }
  }

  // TODO: use modal component and fetching state
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Requirement</DialogTitle>
          <DialogDescription>Update requirement information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="url"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dueDate"
              control={control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        className="z-50"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              {/* Note: submit button does not work */}
              <Button
                type="submit"
                className="bg-blue-500 text-white"
                variant="outline"
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

export default UpdateRequirement

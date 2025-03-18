"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { UpdateTrainingInput, useTraining } from "@/lib/hooks/learnings"
import { cn } from "@/lib/utils"
import { editTrainingSchema, EditTrainingModel } from "@/types"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox/checkbox"

interface UpdateTrainingProps {
  id: number
  trigger: React.ReactNode
  onUpdateSuccess?: (message?: string) => void
  onUpdateError?: (errorMesaage?: string) => void
}

const UpdateTraining = (props: UpdateTrainingProps) => {
  const { id, trigger, onUpdateSuccess, onUpdateError } = props
  const { data, editTraining, getTraining } = useTraining(id)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EditTrainingModel>({
    resolver: zodResolver(editTrainingSchema),
    defaultValues: {
      id: id.toString(),
      name: "",
      description: "",
      type: "",
      url: "",
      dueDate: undefined,
      isMandatory: true,
    },
  })

  const { control, handleSubmit } = form

  useEffect(() => {
    if (data && isOpen) {
      form.reset({
        id: id.toString(),
        name: data.name,
        description: data.description,
        type: data.learning_resource_type.id.toString(),
        url: data.url,
        dueDate: data.deadline_at ? new Date(data.deadline_at) : undefined,
        isMandatory: data.is_mandatory,
      })
    }
  }, [id, data, form, isOpen])

  const handleOpenChange = (isModalOpen: boolean) => {
    if (isModalOpen) {
      getTraining()
    }
    setIsOpen(isModalOpen)
  }

  const submitHandler = async (values: EditTrainingModel) => {
    setIsLoading(true)
    const { name, description, type, url, dueDate, isMandatory } = values
    const input: UpdateTrainingInput = {
      resourceId: id,
      resourceDetails: {
        name: name,
        description: description,
        type_id: Number(type),
        url: url,
        deadline_at: dueDate ? new Date(dueDate).toISOString() : undefined,
        is_mandatory: isMandatory,
      },
    }

    const { data: editedData, error } = await editTraining(input)

    if (error) {
      console.error(`add error : ${error.name}: ${error.message}`)
      if (onUpdateError) {
        onUpdateError()
      }
      setIsOpen(false)
      setIsLoading(false)
      return
    }

    if (editedData?.updatelearning_resourceCollection) {
      if (onUpdateSuccess) {
        onUpdateSuccess()
      }
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  const errorHandler = (error: any) => {
    console.error("errorHandler", error)
  }

  const onSubmit = handleSubmit(submitHandler, errorHandler)

  // TODO: use modal component and fetching state
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Training</DialogTitle>
          <DialogDescription>Update training information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
              name="type"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* TODO: fetch training types from API */}
                      <SelectItem value="1">Digital Learning</SelectItem>
                      <SelectItem value="2">Classroom</SelectItem>
                      <SelectItem value="3">Virtual Classroom</SelectItem>
                    </SelectContent>
                  </Select>
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

            {/* <FormField
              control={control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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

            <FormField
              name="isMandatory"
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
                    <FormLabel>Is Mandatory?</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              {/* Note: submit button does not work */}
              <Button
                className="bg-blue-500 text-white"
                variant="outline"
                type="submit"
                disabled={isLoading}
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

export default UpdateTraining

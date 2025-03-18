"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { TrainingInput, useTraining } from "@/lib/hooks/learnings"
import { cn } from "@/lib/utils"
import { AddTrainingModel, addTrainingSchema } from "@/types"
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
import { Checkbox } from "@/components/ui/checkbox"

interface AddTrainingProps {
  trigger: React.ReactNode
  onAddSuccess?: (message?: string) => void
  onAddError?: (errorMesaage?: string) => void
}

export default function AddTraining(props: AddTrainingProps) {
  const { trigger, onAddSuccess, onAddError } = props
  const { addTraining } = useTraining(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AddTrainingModel>({
    resolver: zodResolver(addTrainingSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      url: "",
      dueDate: undefined,
      isMandatory: true,
    },
  })

  const { control, handleSubmit, reset } = form

  const onSubmit = async (values: AddTrainingModel) => {
    setIsLoading(true)
    const { name, description, type, url, dueDate, isMandatory } = values
    const input: TrainingInput = {
      name: name,
      description: description || "",
      type_id: Number(type),
      url: url || "",
      deadline_at: dueDate ? new Date(dueDate).toISOString() : undefined,
      is_mandatory: isMandatory,
    }

    const { data, error } = await addTraining(input)

    if (error) {
      console.error(`add error : ${error.name}: ${error.message}`)
      if (onAddError) {
        onAddError()
      }
      reset()
      setIsOpen(false)
      setIsLoading(false)
      return
    }

    if (data && data.insertIntolearning_resourceCollection) {
      if (onAddSuccess) {
        onAddSuccess()
      }
      reset()
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  // TODO: use modal component
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          reset()
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Training</DialogTitle>
          <DialogDescription>
            Enter details for the new training.
          </DialogDescription>
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
              name="type"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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

            {/* Note: better looking date picker but doesn't work inside a modal */}
            <FormField
              name="dueDate"
              control={control}
              render={({ field }) => (
                <FormItem className="flex flex-col py-2">
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
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
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
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-500 text-white"
                variant="outline"
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

"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { RequirementInput, useRequirement } from "@/lib/hooks/requirements"
import { cn } from "@/lib/utils"
import { AddRequirementModel, addRequirementSchema } from "@/types"
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

interface AddRequirementProps {
  trigger: React.ReactNode
  onAddSuccess?: (message?: string) => void
  onAddError?: (errorMesaage?: string) => void
}

export default function AddRequirement(props: AddRequirementProps) {
  const { trigger, onAddSuccess, onAddError } = props
  const { addRequirement } = useRequirement(0)
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<AddRequirementModel>({
    resolver: zodResolver(addRequirementSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      dueDate: undefined,
    },
  })

  const { control, handleSubmit, reset } = form

  const onSubmit = async (values: AddRequirementModel) => {
    const { name, description, url, dueDate } = values
    const input: RequirementInput = {
      name: name,
      description: description || "",
      url: url || "",
      deadline_at: dueDate ? new Date(dueDate).toISOString() : undefined,
    }

    const { data, error } = await addRequirement(input)

    if (error) {
      console.error(`add error : ${error.name}: ${error.message}`)
      if (onAddError) {
        onAddError()
      }
      reset()
      setIsOpen(false)
      return
    }

    if (data && data.insertIntocompliance_resourceCollection) {
      if (onAddSuccess) {
        onAddSuccess()
      }
      reset()
      setIsOpen(false)
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
          <DialogTitle>Add Requirement</DialogTitle>
          <DialogDescription>
            Enter details for the new requirement.
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

            <div className="flex justify-end">
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

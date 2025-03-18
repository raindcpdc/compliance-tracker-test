"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DialogContentProps,
  DialogDescriptionProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog"

interface ModalProps {
  open: boolean
  children: React.ReactNode
  title?: string
  description?: string
  trigger?: React.ReactNode
  contentProps?: DialogContentProps
  descriptionProps?: DialogDescriptionProps
  triggerProps?: DialogTriggerProps
  titleProps?: DialogTitleProps
  onOpenChange?: (open: boolean) => void
}

export function Modal(props: ModalProps) {
  const {
    open,
    children,
    contentProps,
    description,
    descriptionProps,
    onOpenChange,
    title,
    titleProps,
    trigger,
    triggerProps,
  } = props
  const [isOpen, setOpen] = useState(open)

  const handleOpenChange = (isModalOpen: boolean) => {
    setOpen(isModalOpen)

    if (onOpenChange) {
      onOpenChange(isModalOpen)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild {...triggerProps}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" {...contentProps}>
        <DialogHeader>
          {title && (
            <DialogTitle className="text-lg font-semibold" {...titleProps}>
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription
              className="mt-2 text-sm text-gray-500"
              {...descriptionProps}
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

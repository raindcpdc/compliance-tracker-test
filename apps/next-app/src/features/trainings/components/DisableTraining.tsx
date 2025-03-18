"use client"
import { useState } from "react"
import { useTraining } from "@/lib/hooks/learnings"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface DisableTrainingProps {
  id: number
  name: string
  trigger: React.ReactNode
  onDisableSuccess?: (message?: string) => void
  onDisableError?: (errorMesaage?: string) => void
}

const DisableTraining = (props: DisableTrainingProps) => {
  const { id, name, trigger, onDisableSuccess, onDisableError } = props
  const [isOpen, setIsOpen] = useState(false)
  const { removeTraining } = useTraining(id)

  const handleSubmit = async () => {
    const { data, error } = await removeTraining(id)

    if (error) {
      console.error(`disable error : ${error.name}: ${error.message}`)
      if (onDisableError) {
        onDisableError()
      }
      setIsOpen(false)
      return
    }

    if (data && data.updatelearning_resourceCollection) {
      console.log("disable success")
      if (onDisableSuccess) {
        onDisableSuccess()
      }
      setIsOpen(false)
    }
  }

  // TODO: use modal component
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Label className="text-lg">Confirm</Label>
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          Confirm disable <b>&quot;{name}&quot;?</b>
        </div>

        <div className="flex justify-end gap-2">
          {/* Note: submit button does not work */}
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 text-white"
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DisableTraining

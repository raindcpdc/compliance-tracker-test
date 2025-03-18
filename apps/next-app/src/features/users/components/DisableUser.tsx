"use client"
import { useState } from "react"
import { useUserManagement } from "@/lib/hooks/users"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface DisableUserProps {
  id: number
  name: string
  trigger: React.ReactNode
  onDisableSuccess?: (message?: string) => void
  onDisableError?: (errorMesaage?: string) => void
}

const DisableUser = (props: DisableUserProps) => {
  const { id, name, trigger, onDisableSuccess, onDisableError } = props
  const [isOpen, setIsOpen] = useState(false)
  const { disableUser } = useUserManagement(id)

  const handleSubmit = async () => {
    const { data, error } = await disableUser(id)

    if (error) {
      if (onDisableError) {
        onDisableError(`Failed to disable user "${name}" user account`)
      }
      setIsOpen(false)
      return
    }

    if (data && data.updateuserCollection) {
      if (data.updateuserCollection.affectedCount > 0) {
        if (onDisableSuccess) {
          onDisableSuccess()
        }
      } else {
        if (onDisableError) {
          onDisableError(
            `${name} user account not found, no account was disabled`
          )
        }
      }
      setIsOpen(false)
    }
  }

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
          Confirm disable <b>&quot;{name}&quot;</b> user account?
        </div>

        <div className="flex justify-end gap-2">
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

export default DisableUser

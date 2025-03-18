"use client"
import { Pencil, Trash2 } from "lucide-react"
import UpdateUser from "./UpdateUser"
import DisableUser from "./DisableUser"
import { useUsersManagement } from "@/lib/hooks/users"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

const UserList = () => {
  const { userList, fetchUsers } = useUsersManagement()

  const handleChangeSuccess = async () => {
    toast.success("User updated")
    fetchUsers()
  }

  const handleUpdateError = (message?: string) => {
    if (message) {
      toast.error(message)
    } else {
      toast.error("Failed to update user")
    }
  }

  const handleDisableError = (message?: string) => {
    if (message) {
      toast.error(message)
    } else {
      toast.error("Failed to disable user")
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <CardTitle className="text-2xl">Manage Users</CardTitle>
            <CardDescription>Edit or disable users</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto_auto] md:grid-cols-[1.5fr_1fr_120px_120px] gap-4 p-4 bg-muted/50 border-b">
            <div className="font-medium">Name</div>
            <div className="font-medium hidden md:block">Role</div>
            <div className="font-medium md:block">Status</div>
            <div className="font-medium text-right">Actions</div>
          </div>
          <div className="divide-y">
            {userList &&
              userList.map((user) => {
                const { node } = user
                const {
                  id,
                  first_name,
                  last_name,
                  email,
                  user_role,
                  is_active,
                } = node
                const fullName = last_name
                  ? `${first_name} ${last_name}`
                  : first_name
                const avatar = "" //TODO: include avatar url

                return (
                  <div
                    key={id}
                    className="grid grid-cols-[1fr_1fr_auto_auto] md:grid-cols-[1.5fr_1fr_120px_120px] gap-4 p-4 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={avatar} alt={fullName} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{fullName}</div>
                        <div className="text-sm text-muted-foreground">
                          {email}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block text-sm">
                      {user_role.name}
                    </div>
                    <div className="md:flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="border rounded-lg p-1">
                        <UpdateUser
                          id={id}
                          trigger={<Pencil className="cursor-pointer" />}
                          onUpdateSuccess={handleChangeSuccess}
                          onUpdateError={handleUpdateError}
                        />
                      </span>
                      <span className="border rounded-lg p-1">
                        <DisableUser
                          id={id}
                          name={fullName}
                          trigger={<Trash2 className="cursor-pointer" />}
                          onDisableSuccess={handleChangeSuccess}
                          onDisableError={handleDisableError}
                        />
                      </span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserList

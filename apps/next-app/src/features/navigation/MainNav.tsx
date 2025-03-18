"use client"
import { useAuth } from "@/lib/hooks/auth"
import { signOut } from "@/actions"
import { Link } from "@/components/ui/link"
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDown } from "lucide-react"

interface MenuProps {
  isManager: boolean
}

const DisplayUsersMenu = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger className="flex items-center">
        Users
        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Link href="/users/manage">Manage</Link>
        </MenubarItem>
        <MenubarItem>
          <Link href="/users/assign">Assign</Link>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}

const DisplayRequirementsMenu = ({ isManager }: MenuProps) => {
  if (isManager) {
    return (
      <MenubarMenu>
        <MenubarTrigger className="flex items-center">
          Requirements
          <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/requirements/manage">Manage</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/requirements/assigned">My Requirements</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    )
  } else {
    return (
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/requirements/assigned">My Requirements</Link>
        </MenubarTrigger>
      </MenubarMenu>
    )
  }
}

const DisplayTrainingsMenu = ({ isManager }: MenuProps) => {
  if (isManager) {
    return (
      <MenubarMenu>
        <MenubarTrigger>
          Trainings
          <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem>
            <Link href="/trainings/manage">Manage</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/trainings/assigned">My Trainings</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    )
  } else {
    return (
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/trainings/assigned">My Trainings</Link>
        </MenubarTrigger>
      </MenubarMenu>
    )
  }
}

const MainNav = () => {
  const { isManager, isLoggedIn } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex justify-between items-center container mx-auto mt-4 mb-4">
      <Link href="/">
        <h1>Compliance Tracker Dashboard</h1>
      </Link>
      {isLoggedIn && (
        <Menubar>
          <>
            {isManager && (
              <>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Link href="/dashboard">Dashboard</Link>
                  </MenubarTrigger>
                </MenubarMenu>

                <DisplayUsersMenu />
              </>
            )}

            <DisplayRequirementsMenu isManager={isManager} />
            <DisplayTrainingsMenu isManager={isManager} />

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/chat">🧠 EllenDyAI</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault()
                  handleSignOut()
                }}
              >
                Log Out
              </Button>
            </MenubarMenu>
          </>
        </Menubar>
      )}
    </div>
  )
}

export default MainNav

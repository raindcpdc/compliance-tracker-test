"use client"
import { signInWithGithub } from "@/actions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const GitHubAuth = () => {
  const login = async () => {
    await signInWithGithub()
  }

  return (
    <div className={cn("grid gap-6")}>
      {/* TODO: use modal in login */}
      <Button
        variant="outline"
        type="button"
        onClick={(e) => {
          e.preventDefault()
          login()
        }}
      >
        Login with Github
      </Button>
    </div>
  )
}

export default GitHubAuth

import { test, expect, describe } from "vitest"
import { render } from "@testing-library/react"

import { Avatar, AvatarImage } from "./avatar"

describe("Avatar", () => {
  test("Avatar renders correctly", () => {
    render(<Avatar className="avatar" />)

    const avatar = document.querySelector(".avatar")
    expect(avatar).toBeDefined()
  })
})

describe("AvatarImage", () => {
  test("AvatarImage renders correctly", () => {
    render(
      <Avatar>
        <AvatarImage className="avatar-image" />
      </Avatar>
    )

    const avatarImage = document.querySelector(".avatar-image")
    expect(avatarImage).toBeDefined()
  })
})

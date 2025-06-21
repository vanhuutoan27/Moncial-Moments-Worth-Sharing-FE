import React from "react"

import { AuthorType } from "@/schemas/user-schema"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserProfileProps {
  author: AuthorType
}

function UserProfile({ author }: UserProfileProps) {
  return (
    <div className="flex justify-between gap-4">
      <Avatar className="size-9">
        <AvatarImage src={author.avatarUrl} alt={author.fullName} />
        <AvatarFallback>{author.fullName.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h4 className="cursor-pointer text-sm font-semibold">{author.fullName}</h4>

        <p className="text-sm">
          Software Engineer at Mon Corporation. Passionate about web development and open source.
        </p>

        <p className="text-muted-foreground text-xs">Joined January 2025</p>
      </div>
    </div>
  )
}

export default UserProfile

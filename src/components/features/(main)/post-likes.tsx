"use client"

import React, { useMemo } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { usersData } from "@/constants/data/users"

interface PostLikesProps {
  likesCount: number
}

function PostLikes({ likesCount }: PostLikesProps) {
  const displayUsers = useMemo(() => usersData.slice(2, 7), [])

  return (
    <div className="flex items-center rounded-full border p-1">
      <div className="flex -space-x-1.5">
        {displayUsers.map((user) => (
          <Avatar key={user.id} className="size-7">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>

      <p className="text-muted-foreground px-2 text-xs">
        Liked by{" "}
        <span className="text-foreground cursor-pointer font-medium hover:underline">
          {displayUsers[0]?.fullName}
        </span>{" "}
        and{" "}
        <span className="text-foreground cursor-pointer font-medium hover:underline">
          {Math.max(0, likesCount - 5)} others
        </span>
        .
      </p>
    </div>
  )
}

export default PostLikes

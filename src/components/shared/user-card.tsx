"use client"

import React from "react"

import UserAvatar from "@/components/shared/user-avatar"

interface UserCardProps {
  user: {
    id: string
    fullName: string
    username: string
    avatarUrl: string
    status: "online" | "offline"
    lastSeen: string
  }
}

function UserCard({ user }: UserCardProps) {
  return (
    <div className="hover:bg-border flex w-full cursor-pointer items-center rounded-md px-3 py-2 duration-200">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative">
          <UserAvatar user={user} className="size-9" />

          {user.status === "online" && (
            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
          )}
        </div>

        <div>
          <h3 className="text-sm">{user.fullName}</h3>
          <p className="text-muted-foreground text-xs">@{user.username}</p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">{user.lastSeen}</p>
    </div>
  )
}

export default UserCard

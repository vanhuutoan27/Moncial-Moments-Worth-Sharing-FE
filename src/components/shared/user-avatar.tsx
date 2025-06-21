"use client"

import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user: {
    id?: string
    fullName: string
    avatarUrl?: string
  }
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  onClick?: () => void
  className?: string
}

const sizeMap = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
  "2xl": "size-20"
}

function UserAvatar({ user, size = "md", onClick, className = "", ...props }: UserAvatarProps) {
  const sizeClass = sizeMap[size]

  return (
    <Avatar className={cn(sizeClass, className)} onClick={onClick} {...props}>
      <AvatarImage src={user.avatarUrl} alt={user.fullName} />
      <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar

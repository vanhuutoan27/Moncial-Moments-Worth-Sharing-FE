"use client"

import React, { useEffect, useMemo, useState } from "react"

import UserAvatar from "@/components/shared/user-avatar"

import { usersData } from "@/constants/data/users"

interface PostLikesProps {
  likesCount: number
}

function PostLikes({ likesCount }: PostLikesProps) {
  const [displayCount, setDisplayCount] = useState<number>(5)

  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(3)
      } else if (window.innerWidth < 1024) {
        setDisplayCount(4)
      } else {
        setDisplayCount(5)
      }
    }

    updateDisplayCount()

    window.addEventListener("resize", updateDisplayCount)

    return () => window.removeEventListener("resize", updateDisplayCount)
  }, [])

  const displayUsers = useMemo(() => usersData.slice(2, 2 + displayCount), [displayCount])

  return (
    <div className="flex items-center rounded-full border p-1">
      <div className="flex -space-x-1.5">
        {displayUsers.map((user) => (
          <UserAvatar key={user.id} user={user} className="size-7" />
        ))}
      </div>

      <p className="text-muted-foreground px-2 text-xs">
        Liked by{" "}
        <span className="text-foreground cursor-pointer font-medium hover:underline">
          {displayUsers[0]?.fullName}
        </span>{" "}
        and{" "}
        <span className="text-foreground cursor-pointer font-medium hover:underline">
          {Math.max(0, likesCount - displayCount)} others
        </span>
        .
      </p>
    </div>
  )
}

export default PostLikes

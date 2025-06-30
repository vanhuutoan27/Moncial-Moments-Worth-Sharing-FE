"use client"

import React from "react"

import { Hash } from "lucide-react"

import { formatPostCount } from "@/utils/format.util"

interface HashtagCardProps {
  hashtag: {
    id: number
    tag: string
    count: number
    trend: "up" | "down" | "stable"
  }
}

function HashtagCard({ hashtag }: HashtagCardProps) {
  return (
    <div className="hover:bg-border flex cursor-pointer items-center justify-between rounded-md px-3 py-2 duration-200">
      <div className="flex flex-1 items-center gap-2">
        <Hash size={16} color="var(--primary)" className="opacity-70" />

        <p className="text-sm">#{hashtag.tag}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">{formatPostCount(hashtag.count)}</span>

        <span
          className={`size-2 rounded-full ${
            hashtag.trend === "up"
              ? "bg-green-600"
              : hashtag.trend === "down"
                ? "bg-red-600"
                : "bg-gray-400"
          }`}
        />
      </div>
    </div>
  )
}

export default HashtagCard

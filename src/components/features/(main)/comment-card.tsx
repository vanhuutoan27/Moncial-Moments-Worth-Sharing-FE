"use client"

import React from "react"

import UserAvatar from "@/components/shared/user-avatar"

import { CommentType } from "@/schemas/comment-schema"

import { formatTimeAgo } from "@/utils/formatters"

interface CommentCardProps {
  commentData: CommentType
}

function CommentCard({ commentData }: CommentCardProps) {
  return (
    <div className="flex gap-3">
      <UserAvatar user={commentData.author} size="sm" />

      <div className="flex-1 space-y-1">
        <div className="border-border rounded-md border px-3 py-2">
          <h3 className="w-fit cursor-pointer text-sm font-semibold">
            {commentData.author.fullName}{" "}
            <span className="text-muted-foreground text-xs">@{commentData.author.username}</span>{" "}
            {commentData.isEdited && (
              <span className="text-muted-foreground text-xs">(edited)</span>
            )}
          </h3>

          <p className="text-sm">{commentData.content}</p>
        </div>

        <p className="text-muted-foreground px-3 text-xs">{formatTimeAgo(commentData.createdAt)}</p>
      </div>
    </div>
  )
}

export default CommentCard

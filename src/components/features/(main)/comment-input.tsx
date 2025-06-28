"use client"

import React, { useCallback, useState } from "react"

import { Send } from "lucide-react"

import UserAvatar from "@/components/shared/user-avatar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { AuthorType } from "@/schemas/user-schema"

function CommentInput({
  currentUser,
  onSubmit
}: {
  currentUser?: AuthorType
  onSubmit?: (content: string) => void
}) {
  const [comment, setComment] = useState<string>("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (comment.trim()) {
        onSubmit?.(comment.trim())
        setComment("")
      }
    },
    [comment, onSubmit]
  )

  if (!currentUser) return null

  return (
    <div className="flex gap-3">
      <UserAvatar user={currentUser} size="sm" />

      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />

        <Button type="submit" disabled={!comment.trim()} variant="ghost" size="icon">
          <Send size={16} color="var(--primary)" className="opacity-70" />
        </Button>
      </form>
    </div>
  )
}

export default CommentInput

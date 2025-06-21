"use client"

import React from "react"

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PostActionsProps {
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onSave: () => void
}

function PostActions({ isLiked, isSaved, onLike, onSave, onComment, onShare }: PostActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className={`${isLiked ? "bg-border" : ""}`}
          onClick={onLike}
        >
          <Heart
            size={20}
            color={isLiked ? "var(--destructive)" : "var(--primary)"}
            fill={isLiked ? "var(--destructive)" : "none"}
            className="size-5 opacity-70"
          />
        </Button>

        <Button variant="ghost" size="icon" onClick={onComment}>
          <MessageCircle size={20} color="var(--primary)" className="size-5 opacity-70" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onShare}>
          <Send size={20} color="var(--primary)" className="size-5 opacity-70" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`${isSaved ? "bg-border" : ""}`}
        onClick={onSave}
      >
        <Bookmark
          size={20}
          color={isSaved ? "#eab308" : "var(--primary)"}
          fill={isSaved ? "#eab308" : "none"}
          className="size-5 opacity-70"
        />
      </Button>
    </div>
  )
}

export default PostActions

"use client"

import React from "react"

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PostActionsProps {
  isLiked: boolean
  isBookmarked: boolean
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onBookmark: () => void
}

function PostActions({
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onComment,
  onShare
}: PostActionsProps) {
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
            className="opacity-70"
          />
        </Button>

        <Button variant="ghost" size="icon" onClick={onComment}>
          <MessageCircle size={20} color="var(--primary)" className="opacity-70" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onShare}>
          <Send size={20} color="var(--primary)" className="opacity-70" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`${isBookmarked ? "bg-border" : ""}`}
        onClick={onBookmark}
      >
        <Bookmark
          size={20}
          color={isBookmarked ? "#eab308" : "var(--primary)"}
          fill={isBookmarked ? "#eab308" : "none"}
          className="opacity-70"
        />
      </Button>
    </div>
  )
}

export default PostActions

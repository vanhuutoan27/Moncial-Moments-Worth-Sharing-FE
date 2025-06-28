"use client"

import React, { useMemo, useState } from "react"

import { CommentType } from "@/schemas/comment-schema"
import { AuthorType } from "@/schemas/user-schema"

import CommentCard from "./comment-card"
import CommentInput from "./comment-input"

interface PostCommentsProps {
  commentsData?: CommentType[]
  commentsCount: number
  currentUser?: AuthorType
  onCommentSubmit?: (content: string) => void
}

function PostComments({
  commentsData = [],
  commentsCount,
  currentUser,
  onCommentSubmit
}: PostCommentsProps) {
  const [showAllComments, setShowAllComments] = useState<boolean>(false)

  const commentsText = useMemo(() => {
    if (commentsCount === 0) return "No comments yet"
    if (commentsCount === 1) return "View 1 comment"
    return `View all ${commentsCount} comments`
  }, [commentsCount])

  const displayedComments = useMemo(() => {
    if (showAllComments) return commentsData
    return commentsData.slice(0, 2)
  }, [commentsData, showAllComments])

  return (
    <div className="space-y-3">
      {commentsCount > 0 && (
        <button
          onClick={() => setShowAllComments(!showAllComments)}
          className="text-muted-foreground w-fit cursor-pointer text-sm hover:underline"
        >
          {showAllComments ? "Hide comments" : commentsText}
        </button>
      )}

      {displayedComments.length > 0 && (
        <div className="space-y-2">
          {displayedComments.map((comment) => (
            <CommentCard key={comment.id} commentData={comment} />
          ))}
        </div>
      )}

      <CommentInput currentUser={currentUser} onSubmit={onCommentSubmit} />
    </div>
  )
}

export default PostComments

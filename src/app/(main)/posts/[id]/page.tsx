"use client"

import React, { useCallback, useMemo } from "react"

import { useParams } from "next/navigation"

import NotFoundPage from "@/app/not-found"

import PostCard from "@/components/features/(main)/post-card"

import { ZOTAEUS } from "@/constants/app"
import { commentsData } from "@/constants/data/comments"
import { postsData } from "@/constants/data/posts"

function PostPage() {
  const params = useParams()
  const postId = params.id as string

  const currentUserData = useMemo(
    () => ({
      id: ZOTAEUS.id,
      fullName: ZOTAEUS.fullName,
      username: ZOTAEUS.username,
      avatarUrl: ZOTAEUS.avatarUrl
    }),
    []
  )

  const postData = postsData.find((post) => post.id === postId)
  const filteredCommentsData = commentsData.filter((comment) => comment.postId === postId)

  const handleLike = useCallback((postId: string, isLiked: boolean) => {
    console.log("Like toggled:", postId, isLiked)
  }, [])

  const handleComment = useCallback((postId: string) => {
    console.log("Comment clicked:", postId)
  }, [])

  const handleShare = useCallback((postId: string) => {
    console.log("Share clicked:", postId)
  }, [])

  const handleSave = useCallback((postId: string, isSaved: boolean) => {
    console.log("Save toggled:", postId, isSaved)
  }, [])

  const handleMenuAction = useCallback((postId: string, action: string) => {
    console.log("Menu action:", postId, action)
  }, [])

  const handleCommentSubmit = useCallback((postId: string, content: string) => {
    console.log("Comment submitted:", postId, content)
  }, [])

  if (!postData) {
    return <NotFoundPage />
  }

  return (
    <div>
      <PostCard
        key={postData.id}
        postData={postData}
        commentsData={filteredCommentsData}
        currentUser={currentUserData}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        onSave={handleSave}
        onMenuAction={handleMenuAction}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  )
}

export default PostPage

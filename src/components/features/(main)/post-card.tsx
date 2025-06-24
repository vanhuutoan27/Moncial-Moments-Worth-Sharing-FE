"use client"

import React, { useCallback, useMemo, useState } from "react"

import { formatDistanceToNow } from "date-fns"
import { Bookmark, Ellipsis, Eye, Trash2 } from "lucide-react"

import UserAvatar from "@/components/shared/user-avatar"
import UserProfile from "@/components/shared/user-profile"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { PostType } from "@/schemas/post-schema"

import PostActions from "./post-actions"
import PostContent from "./post-content"
import PostImages from "./post-images"
import PostLikes from "./post-likes"

interface PostCardProps {
  postData: PostType
  onLike?: (postId: string, isLiked: boolean) => void
  onSave?: (postId: string, isSaved: boolean) => void
  onShare?: (postId: string) => void
  onComment?: (postId: string) => void
  onMenuAction?: (postId: string, action: string) => void
}

function PostCard({ postData, onLike, onSave, onShare, onComment, onMenuAction }: PostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const formattedDate = useMemo(
    () => formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true }),
    [postData.createdAt]
  )

  const commentsText = useMemo(() => {
    if (postData.commentsCount === 0) return "No comments yet"
    if (postData.commentsCount === 1) return "View 1 comment"
    return `View all ${postData.commentsCount} comments`
  }, [postData.commentsCount])

  const handleLikeToggle = useCallback(() => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    onLike?.(postData.id, newLikedState)
  }, [isLiked, onLike, postData.id])

  const handleComment = useCallback(() => {
    onComment?.(postData.id)
  }, [onComment, postData.id])

  const handleShare = useCallback(() => {
    onShare?.(postData.id)
  }, [onShare, postData.id])

  const handleSaveToggle = useCallback(() => {
    const newSavedState = !isSaved
    setIsSaved(newSavedState)
    onSave?.(postData.id, newSavedState)
  }, [isSaved, onSave, postData.id])

  const handleMenuAction = useCallback(
    (action: string) => {
      onMenuAction?.(postData.id, action)
    },
    [onMenuAction, postData.id]
  )

  return (
    <div className="border-border flex w-full flex-col gap-4 rounded-lg border p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <UserAvatar user={postData.author} />
            </HoverCardTrigger>

            <HoverCardContent className="w-80">
              <UserProfile author={postData.author} />
            </HoverCardContent>
          </HoverCard>

          <div className="space-y-0.5">
            <HoverCard>
              <HoverCardTrigger asChild>
                <h3 className="text-foreground w-fit cursor-pointer text-sm font-semibold">
                  {postData.author.fullName}
                </h3>
              </HoverCardTrigger>

              <HoverCardContent className="w-80">
                <UserProfile author={postData.author} />
              </HoverCardContent>
            </HoverCard>

            <p className="text-muted-foreground text-xs">
              <span className="cursor-pointer hover:underline">@{postData.author.username}</span>{" "}
              {postData && `• ${postData.location}`} • {formattedDate}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="icon">
              <Ellipsis size={20} color="var(--primary)" className="size-5 opacity-70" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleMenuAction("option1")}>
                <Bookmark size={16} color="var(--primary)" className="opacity-70" />
                <span>Save post</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleMenuAction("option2")}>
                <Eye size={16} color="var(--primary)" className="opacity-70" />
                <span>Hide post</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={() => handleMenuAction("delete")}>
              <Trash2 size={16} color="var(--destructive)" className="opacity-70" />
              <span>Delete post</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {postData.images && postData.images.length > 0 && (
        <PostImages images={postData.images} priority />
      )}

      <div className="space-y-4">
        <PostActions
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={handleLikeToggle}
          onComment={handleComment}
          onShare={handleShare}
          onSave={handleSaveToggle}
        />

        <PostLikes likesCount={postData.likesCount} />

        <PostContent caption={postData.caption} hashtags={postData.hashtags} />
      </div>

      <p className="text-muted-foreground w-fit cursor-pointer text-sm">{commentsText}</p>
    </div>
  )
}

export default PostCard

"use client"

import React, { useCallback, useState } from "react"

import Link from "next/link"

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

import { formatTimeAgo } from "@/utils/format.util"

import { CommentType } from "@/validations/comment.validation"
import { PostType } from "@/validations/post.validation"
import { AuthorType } from "@/validations/user.validation"

import PostActions from "./post-actions"
import PostComments from "./post-comments"
import PostContent from "./post-content"
import PostImage from "./post-image"
import PostLikes from "./post-likes"

interface PostCardProps {
  postData: PostType
  commentsData?: CommentType[]
  currentUser?: AuthorType
  onLike?: (postId: string, isLiked: boolean) => void
  onShare?: (postId: string) => void
  onComment?: (postId: string) => void
  onSave?: (postId: string, isSaved: boolean) => void
  onMenuAction?: (postId: string, action: string) => void
  onCommentSubmit?: (postId: string, content: string) => void
}

function PostCard({
  postData,
  commentsData = [],
  currentUser,
  onLike,
  onComment,
  onShare,
  onSave,
  onMenuAction,
  onCommentSubmit
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)

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

  const handleCommentSubmit = useCallback(
    (content: string) => {
      onCommentSubmit?.(postData.id, content)
    },
    [onCommentSubmit, postData.id]
  )

  return (
    <div className="border-border flex w-full flex-col gap-4 rounded-lg border p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <UserAvatar user={postData.author} />

          <div className="space-y-0.5">
            <HoverCard>
              <HoverCardTrigger asChild>
                <h3 className="text-foreground w-fit cursor-pointer text-sm font-semibold">
                  {postData.author.fullName}{" "}
                  <span className="text-muted-foreground inline-block cursor-pointer font-normal md:hidden">
                    @{postData.author.username}
                  </span>
                </h3>
              </HoverCardTrigger>

              <HoverCardContent className="w-80">
                <UserProfile author={postData.author} />
              </HoverCardContent>
            </HoverCard>

            <p className="text-muted-foreground text-xs">
              {postData.author.username && (
                <span className="hidden cursor-pointer underline-offset-4 hover:underline md:inline-block">
                  @{postData.author.username}
                </span>
              )}

              {postData.author.username && <span className="hidden md:inline"> • </span>}

              {postData.location && <span>{postData.location}</span>}

              {postData.author.username && postData.location && " • "}

              <Link href={`/posts/${postData.id}`}>{formatTimeAgo(postData.createdAt)}</Link>
            </p>
          </div>
        </div>

        <DropdownMenu modal={false}>
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
        <PostImage images={postData.images} priority />
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

        <PostComments
          commentsData={commentsData}
          commentsCount={postData.commentsCount}
          currentUser={currentUser}
          onCommentSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  )
}

export default PostCard

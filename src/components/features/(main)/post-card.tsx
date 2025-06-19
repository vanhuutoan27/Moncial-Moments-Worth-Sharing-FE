"use client"

import React from "react"

import { formatDistanceToNow } from "date-fns"
import {
  Bolt,
  BookOpen,
  Bookmark,
  Ellipsis,
  Heart,
  Layers2,
  LogOut,
  MessageCircle,
  Send
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { PostType } from "@/schemas/post-schema"

import { PostImage } from "./post-image"

interface PostCardProps {
  postData: PostType
}

function PostCard({ postData }: PostCardProps) {
  return (
    <div className="border-border flex w-full max-w-lg flex-col gap-4 rounded-lg border p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-10">
            <AvatarImage src={postData.author.avatarUrl} alt={postData.author.fullName} />
            <AvatarFallback>{postData.author.fullName}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-foreground w-fit cursor-pointer text-sm font-semibold">
              {postData.author.fullName}
            </h3>

            <p className="text-muted-foreground text-xs">
              {postData.location} •{" "}
              {formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full duration-300">
              <Ellipsis size={20} color="var(--primary)" className="opacity-70" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Bolt size={16} color="var(--primary)" className="opacity-70" />
                <span>Option 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layers2 size={16} color="var(--primary)" className="opacity-70" />
                <span>Option 2</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen size={16} color="var(--primary)" className="opacity-70" />
                <span>Option 3</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive">
              <LogOut size={16} color="var(--primary)" className="opacity-70" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {postData.images && postData.images.length > 0 && (
        <PostImage images={postData.images} priority />
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full duration-300">
              <Heart size={20} color="var(--primary)" className="opacity-70" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full duration-300">
              <MessageCircle size={20} color="var(--primary)" className="opacity-70" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full duration-300">
              <Send size={20} color="var(--primary)" className="opacity-70" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="rounded-full duration-300">
            <Bookmark size={20} color="var(--primary)" className="opacity-70" />
          </Button>
        </div>

        <div>
          <h4 className="text-foreground text-sm">{postData.caption} </h4>

          <p className="text-muted-foreground text-sm">
            {postData.hashtags?.map((hashtag, index) => (
              <span key={index} className="cursor-pointer hover:underline">
                #{hashtag}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground w-fit cursor-pointer text-sm">
        View all {postData.commentsCount} comments
      </p>
    </div>
  )
}

export default PostCard

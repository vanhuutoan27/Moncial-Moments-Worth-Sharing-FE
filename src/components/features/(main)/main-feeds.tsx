"use client"

import React, { useCallback, useMemo, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ZOTAEUS } from "@/constants/app"
import { commentsData } from "@/constants/data/comments"
import { postsData } from "@/constants/data/posts"

import PostCard from "./post-card"

type FeedOption = "feed" | "trending" | "following" | "saved"

function MainFeeds() {
  const [activeTab, setActiveTab] = useState<FeedOption>("feed")

  const currentUserData = useMemo(
    () => ({
      id: ZOTAEUS.id,
      fullName: ZOTAEUS.fullName,
      username: ZOTAEUS.username,
      avatarUrl: ZOTAEUS.avatarUrl
    }),
    []
  )

  const followingUserIds = useMemo(() => ["a094db3e-d897-4e6b-9588-8fec7029a923"], [])
  const savedPostIds = useMemo(() => ["p1", "p5"], [])

  const tabs: { value: FeedOption; label: string }[] = [
    { value: "feed", label: "Feed" },
    { value: "trending", label: "Trending" },
    { value: "following", label: "Following" },
    { value: "saved", label: "Saved" }
  ]

  const filteredPostsData = useMemo(() => {
    const posts = [...postsData]

    switch (activeTab) {
      case "feed":
        return posts
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .sort((a, b) => {
            const aIsFollowing = followingUserIds.includes(a.authorId)
            const bIsFollowing = followingUserIds.includes(b.authorId)
            if (aIsFollowing && !bIsFollowing) return -1
            if (!aIsFollowing && bIsFollowing) return 1
            return 0
          })

      case "trending":
        return posts
          .filter((post) => {
            const postTime = new Date(post.createdAt).getTime()
            const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
            return postTime > oneDayAgo
          })
          .sort((a, b) => {
            const aEngagement = a.likesCount + a.commentsCount
            const bEngagement = b.likesCount + b.commentsCount
            return bEngagement - aEngagement
          })

      case "following":
        return posts
          .filter((post) => followingUserIds.includes(post.authorId))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      case "saved":
        return posts
          .filter((post) => savedPostIds.includes(post.id))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      default:
        return posts
    }
  }, [activeTab, followingUserIds, savedPostIds])

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as FeedOption)
  }, [])

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

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="items-end">
        <TabsList className="bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            <div className="flex flex-col items-center space-y-6">
              {filteredPostsData.length > 0 ? (
                filteredPostsData.map((post) => (
                  <PostCard
                    key={post.id}
                    postData={post}
                    commentsData={commentsData.filter((comment) => comment.postId === post.id)}
                    currentUser={currentUserData}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    onSave={handleSave}
                    onMenuAction={handleMenuAction}
                    onCommentSubmit={handleCommentSubmit}
                  />
                ))
              ) : (
                <p className="text-muted-foreground my-10 text-center text-base">
                  {activeTab === "following" && "No posts from people you follow"}
                  {activeTab === "saved" && "No saved posts"}
                  {activeTab === "trending" && "No trending posts in the last 24 hours"}
                  {activeTab === "feed" && "No posts available"}
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default MainFeeds

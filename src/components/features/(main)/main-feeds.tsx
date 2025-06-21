"use client"

import React, { useCallback, useMemo, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { postsData } from "@/constants/data/posts"

import PostCard from "./post-card"

type FeedOption = "feed" | "trending" | "following" | "saved"

function MainFeeds() {
  const [activeTab, setActiveTab] = useState<FeedOption>("feed")

  const followingUserIds = useMemo(() => ["user1", "user2", "user3"], [])
  // const savedPostIds = useMemo(() => ["post1", "post3", "post5"], [])

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

      case "saved":
        return posts

      default:
        return posts
    }
  }, [activeTab, followingUserIds])

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as FeedOption)
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
                filteredPostsData.map((post) => <PostCard key={post.id} postData={post} />)
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

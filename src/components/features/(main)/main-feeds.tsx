"use client"

import React, { useCallback, useMemo, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { postsData } from "@/constants/data/posts"

import PostCard from "./post-card"

type SortOption = "newest" | "oldest" | "trending"

function MainFeeds() {
  const [activeTab, setActiveTab] = useState<SortOption>("newest")

  const tabs: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "trending", label: "Trending" }
  ]

  const sortedPostsData = useMemo(() => {
    const posts = [...postsData]

    switch (activeTab) {
      case "newest":
        return posts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

      case "oldest":
        return posts.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )

      case "trending":
        return posts.sort((a, b) => b.likesCount - a.likesCount)

      default:
        return posts
    }
  }, [activeTab])

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as SortOption)
  }, [])

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="items-end">
        <TabsList className="bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            <div className="flex flex-col items-center space-y-6">
              {sortedPostsData.map((post) => (
                <PostCard key={post.id} postData={post} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default MainFeeds

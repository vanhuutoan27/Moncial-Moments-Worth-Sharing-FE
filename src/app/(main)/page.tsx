"use client"

import React from "react"

import MainFeeds from "@/components/features/(main)/main-feeds"
import NewPost from "@/components/features/(main)/new-post"

function HomePage() {
  // const { posts, loading, error } = usePosts()

  // if (loading) {
  //   return <LoadingPage />
  // }

  return (
    <div className="space-y-6">
      <NewPost />
      <MainFeeds />
    </div>
  )
}

export default HomePage

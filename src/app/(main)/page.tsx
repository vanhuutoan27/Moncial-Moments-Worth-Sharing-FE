"use client"

import React from "react"

import PostCard from "@/components/features/(main)/post-card"

import { postsData } from "@/constants/data/posts"

function HomePage() {
  // const { posts, loading, error } = usePosts()

  // if (loading) {
  //   return <LoadingPage />
  // }

  return (
    <div className="flex flex-col items-center space-y-6">
      {postsData.map((post) => (
        <PostCard key={post.id} postData={post} />
      ))}
    </div>
  )
}

export default HomePage

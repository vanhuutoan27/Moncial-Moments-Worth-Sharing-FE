import React from "react"

import { postsData } from "@/constants/data/posts"

import PostCard from "./post-card"

function MainFeeds() {
  return (
    <div className="flex w-full flex-col items-center space-y-6">
      {postsData.map((post) => (
        <PostCard key={post.id} postData={post} />
      ))}
    </div>
  )
}

export default MainFeeds

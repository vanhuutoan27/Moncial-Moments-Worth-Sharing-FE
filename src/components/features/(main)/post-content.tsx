"use client"

import React from "react"

interface PostContentProps {
  caption?: string
  hashtags?: string[]
}

function PostContent({ caption, hashtags }: PostContentProps) {
  return (
    <div>
      <h4 className="text-foreground text-sm">{caption} </h4>

      <p className="text-muted-foreground text-sm">
        {hashtags?.map((hashtag, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            #{hashtag}{" "}
          </span>
        ))}
      </p>
    </div>
  )
}

export default PostContent

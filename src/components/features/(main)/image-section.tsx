"use client"

import React from "react"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { PostMediaType } from "@/schemas/post-schema"

import PostImage from "./post-image"

interface ImageSectionProps {
  images: PostMediaType[]
  onImageRemove: (index: number) => void
  onClearAll: () => void
}

function ImageSection({ images, onImageRemove, onClearAll }: ImageSectionProps) {
  if (images.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Images ({images.length})</Label>

        <Button type="button" variant="destructive" size="sm" onClick={onClearAll}>
          <Trash2 size={12} />
          Clear all
        </Button>
      </div>

      <PostImage images={images} priority onImageRemove={onImageRemove} showDeleteButtons />
    </div>
  )
}

export default ImageSection

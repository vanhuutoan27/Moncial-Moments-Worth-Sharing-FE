"use client"

import React from "react"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { PostMediaType } from "@/validations/post.validation"

import PostImage from "./post-image"

interface ImageSectionProps {
  images: PostMediaType[]
  onImageRemove: (index: number) => void
  onClearAll: () => void
}

function ImageSection({ images, onImageRemove, onClearAll }: ImageSectionProps) {
  const t = useTranslations("app.post.compose.form.fields.images")

  if (images.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>
          {t("label")} ({images.length})
        </Label>

        <Button type="button" variant="destructive" size="sm" onClick={onClearAll}>
          <Trash2 size={12} />
          {t("actions.clearAll")}
        </Button>
      </div>

      <PostImage images={images} priority onImageRemove={onImageRemove} showDeleteButtons />
    </div>
  )
}

export default ImageSection

"use client"

import React from "react"

import { Calendar, Hash, Image as ImageIcon, MapPin, Video } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

interface NewPostActionsProps {
  hasImages: boolean
  showLocationSection: boolean
  showHashtagSection: boolean
  onImageUpload: () => void
  onLocationToggle: () => void
  onHashtagToggle: () => void
}

function NewPostActions({
  hasImages,
  showLocationSection,
  showHashtagSection,
  onImageUpload,
  onLocationToggle,
  onHashtagToggle
}: NewPostActionsProps) {
  const t = useTranslations("app.post.compose.attachments")

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant={hasImages ? "default" : "outline"}
        size="sm"
        onClick={onImageUpload}
        className="border"
      >
        <ImageIcon
          size={16}
          color={hasImages ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        {t("photo")}
      </Button>

      <Button type="button" variant="outline" size="sm" className="border">
        <Video size={16} color="var(--primary)" className="size-4 opacity-70" />
        {t("video")}
      </Button>

      <Button type="button" variant="outline" size="sm" className="border">
        <Calendar size={16} color="var(--primary)" className="size-4 opacity-70" />
        {t("event")}
      </Button>

      <Button
        type="button"
        variant={showLocationSection ? "default" : "outline"}
        size="sm"
        onClick={onLocationToggle}
        className="border"
      >
        <MapPin
          size={16}
          color={showLocationSection ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        {t("location")}
      </Button>

      <Button
        type="button"
        variant={showHashtagSection ? "default" : "outline"}
        size="sm"
        onClick={onHashtagToggle}
        className="border"
      >
        <Hash
          size={16}
          color={showHashtagSection ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        {t("hashtag")}
      </Button>
    </div>
  )
}

export default NewPostActions

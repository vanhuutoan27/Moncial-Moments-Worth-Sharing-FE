"use client"

import React from "react"

import { Hash, Image as ImageIcon, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

interface NewPostActionsProps {
  showLocationSection: boolean
  showHashtagSection: boolean
  hasImages: boolean
  onLocationToggle: () => void
  onHashtagToggle: () => void
  onImageUpload: () => void
}

function NewPostActions({
  showLocationSection,
  showHashtagSection,
  hasImages,
  onLocationToggle,
  onHashtagToggle,
  onImageUpload
}: NewPostActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant={showLocationSection ? "default" : "outline"}
        size="sm"
        onClick={onLocationToggle}
        className="border font-normal"
      >
        <MapPin
          size={16}
          color={showLocationSection ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        Location
      </Button>

      <Button
        type="button"
        variant={hasImages ? "default" : "outline"}
        size="sm"
        onClick={onImageUpload}
        className="border font-normal"
      >
        <ImageIcon
          size={16}
          color={hasImages ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        Upload
      </Button>

      <Button
        type="button"
        variant={showHashtagSection ? "default" : "outline"}
        size="sm"
        onClick={onHashtagToggle}
        className="border font-normal"
      >
        <Hash
          size={16}
          color={showHashtagSection ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        Hashtag
      </Button>
    </div>
  )
}

export default NewPostActions

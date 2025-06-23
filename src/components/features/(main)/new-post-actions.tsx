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
        className="font-normal"
      >
        <MapPin size={12} color={showLocationSection ? "var(--foreground)" : "var(--primary)"} />
        Location
      </Button>

      <Button
        type="button"
        variant={hasImages ? "default" : "outline"}
        size="sm"
        onClick={onImageUpload}
        className="font-normal"
      >
        <ImageIcon size={12} color={hasImages ? "var(--foreground)" : "var(--primary)"} />
        Upload
      </Button>

      <Button
        type="button"
        variant={showHashtagSection ? "default" : "outline"}
        size="sm"
        onClick={onHashtagToggle}
        className="font-normal"
      >
        <Hash size={12} color={showHashtagSection ? "var(--foreground)" : "var(--primary)"} />
        Hashtag
      </Button>
    </div>
  )
}

export default NewPostActions

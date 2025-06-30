"use client"

import React, { useCallback, useRef, useState } from "react"

import { PencilLine } from "lucide-react"

import UserAvatar from "@/components/shared/user-avatar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { ZOTAEUS } from "@/constants/app"
import { Privacy } from "@/constants/enums/privacy"

import { processImageFile, sanitizeHashtag } from "@/utils/helper.util"

import { PostMediaType } from "@/validations/post.validation"

import DragOverlay from "./drag-overlay"
import HashtagSection from "./hashtag-section"
import ImageSection from "./image-section"
import LocationSection from "./location-section"
import NewPostActions from "./new-post-actions"
import NewPostHeader from "./new-post-header"

function NewPost() {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [showLocationSection, setShowLocationSection] = useState<boolean>(false)
  const [showHashtagSection, setShowHashtagSection] = useState<boolean>(false)
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const [privacy, setPrivacy] = useState<Privacy>(Privacy.PUBLIC)
  const [caption, setCaption] = useState<string>("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<PostMediaType[]>([])
  const [locationQuery, setLocationQuery] = useState<string>("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState<string>("")

  const canAddHashtags = hashtags.length < 10

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
      if (imageFiles.length === 0) return

      const processed = await Promise.all(imageFiles.map(processImageFile))

      setImageFiles((prev) => [...prev, ...imageFiles])
      setProcessedImages((prev) => [...prev, ...processed])

      if (!isExpanded) setIsExpanded(true)
    },
    [isExpanded]
  )

  const handleExpand = useCallback(() => setIsExpanded(true), [])

  const handleCancel = useCallback(() => {
    setIsExpanded(false)
    setCaption("")
    setImageFiles([])
    setProcessedImages([])
    setLocationQuery("")
    setHashtags([])
    setHashtagInput("")
    setShowLocationSection(false)
    setShowHashtagSection(false)
  }, [])

  const handleCaptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value.slice(0, 2000))
  }, [])

  const toggleLocationSection = useCallback(() => {
    setShowLocationSection((prev) => !prev)
  }, [])

  const toggleHashtagSection = useCallback(() => {
    setShowHashtagSection((prev) => !prev)
  }, [])

  const triggerImageUpload = useCallback(() => {
    imageInputRef.current?.click()
  }, [])

  const handleImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return

      await processFiles(files)
      if (imageInputRef.current) imageInputRef.current.value = ""
    },
    [processFiles]
  )

  const removeImage = useCallback((index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setProcessedImages((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearAllImages = useCallback(() => {
    setImageFiles([])
    setProcessedImages([])
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) await processFiles(files)
    },
    [processFiles]
  )

  const addHashtag = useCallback(
    (tag: string) => {
      const sanitized = sanitizeHashtag(tag)

      if (sanitized.length > 0 && !hashtags.includes(sanitized) && canAddHashtags) {
        setHashtags((prev) => [...prev, sanitized])
        setHashtagInput("")
      }
    },
    [hashtags, canAddHashtags]
  )

  const removeHashtag = useCallback((tagToRemove: string) => {
    setHashtags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }, [])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e

      if (["Enter", " ", ","].includes(key)) {
        e.preventDefault()
        if (hashtagInput.trim()) addHashtag(hashtagInput)
      } else if (key === "Backspace" && !hashtagInput && hashtags.length > 0) {
        setHashtags((prev) => prev.slice(0, -1))
      }
    },
    [hashtagInput, hashtags, addHashtag]
  )

  return (
    <div
      ref={dropZoneRef}
      className={`bg-background border-border relative flex w-full flex-col gap-4 rounded-lg border p-4 shadow-md transition-all duration-200 ${
        isDragOver ? "border-primary outline-primary outline" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver && <DragOverlay isExpanded={isExpanded} />}

      <div className="flex items-center gap-4">
        <UserAvatar
          user={{
            fullName: ZOTAEUS.fullName,
            avatarUrl: ZOTAEUS.avatarUrl
          }}
          size="md"
        />

        {!isExpanded ? (
          <>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Share your thoughts with the world..."
                onFocus={handleExpand}
                className="w-full cursor-pointer"
              />

              <PencilLine
                size={16}
                color="var(--primary)"
                className="absolute top-1/2 right-3 hidden -translate-y-1/2 opacity-70 md:block"
              />
            </div>

            <Button
              type="button"
              variant="default"
              onClick={handleExpand}
              className="hidden font-semibold md:block"
            >
              Share
            </Button>
          </>
        ) : (
          <NewPostHeader privacy={privacy} onPrivacyChange={setPrivacy} onCancel={handleCancel} />
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="caption">Caption</Label>
              <span className="text-muted-foreground text-xs">{caption.length}/2000</span>
            </div>

            <Textarea
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Share your thoughts with the world..."
              rows={4}
              className="resize-none"
            />
          </div>

          <NewPostActions
            hasImages={imageFiles.length > 0}
            showLocationSection={showLocationSection}
            showHashtagSection={showHashtagSection}
            onImageUpload={triggerImageUpload}
            onLocationToggle={toggleLocationSection}
            onHashtagToggle={toggleHashtagSection}
          />

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />

          {showLocationSection && (
            <LocationSection
              locationQuery={locationQuery}
              onLocationChange={setLocationQuery}
              onLocationSelect={setLocationQuery}
            />
          )}

          <ImageSection
            images={processedImages}
            onImageRemove={removeImage}
            onClearAll={clearAllImages}
          />

          {showHashtagSection && (
            <HashtagSection
              hashtags={hashtags}
              hashtagInput={hashtagInput}
              onHashtagInputChange={setHashtagInput}
              onAddHashtag={addHashtag}
              onRemoveHashtag={removeHashtag}
              onKeyPress={handleKeyPress}
            />
          )}

          <Button type="submit" variant="default" className="mt-2 w-full font-semibold">
            Share
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewPost

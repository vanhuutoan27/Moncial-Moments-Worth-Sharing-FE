"use client"

import React, { useCallback, useRef, useState } from "react"

import { PencilLine } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Privacy } from "@/constants/enums/privacy"

import { PostImageType } from "@/schemas/post-schema"

import { processImageFile, sanitizeHashtag } from "@/utils/helpers"

import DragOverlay from "./drag-overlay"
import HashtagSection from "./hashtag-section"
import ImageSection from "./image-section"
import LocationSection from "./location-section"
import NewPostActions from "./new-post-actions"
import UserHeader from "./user-header"

function NewPost() {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [showLocationSection, setShowLocationSection] = useState<boolean>(false)
  const [showHashtagSection, setShowHashtagSection] = useState<boolean>(false)
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  const [privacy, setPrivacy] = useState<Privacy>(Privacy.PUBLIC)
  const [caption, setCaption] = useState<string>("")
  const [locationQuery, setLocationQuery] = useState<string>("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState<string>("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<PostImageType[]>([])

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
    setHashtags([])
    setHashtagInput("")
    setImageFiles([])
    setProcessedImages([])
    setCaption("")
    setLocationQuery("")
    setShowLocationSection(false)
    setShowHashtagSection(false)
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

  const handleCaptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value.slice(0, 2000))
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
        <Avatar className="size-10">
          <AvatarImage
            src="https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
            alt="Zotaeus"
          />
          <AvatarFallback>{"Zotaeus".charAt(0)}</AvatarFallback>
        </Avatar>

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
                className="absolute top-2.5 right-3 opacity-70"
              />
            </div>

            <Button variant="default" onClick={handleExpand}>
              Share
            </Button>
          </>
        ) : (
          <UserHeader privacy={privacy} onPrivacyChange={setPrivacy} onCancel={handleCancel} />
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
            showLocationSection={showLocationSection}
            showHashtagSection={showHashtagSection}
            hasImages={imageFiles.length > 0}
            onLocationToggle={toggleLocationSection}
            onHashtagToggle={toggleHashtagSection}
            onImageUpload={triggerImageUpload}
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

          <Button type="submit" variant="default" className="mt-2 w-full">
            Share
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewPost

"use client"

import React, { useCallback, useRef, useState } from "react"

import {
  ChevronDown,
  Globe,
  Hash,
  Image as ImageIcon,
  LockKeyhole,
  MapPin,
  PencilLine,
  Trash2,
  Upload,
  Users,
  X
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Privacy, getPrivacyInfo } from "@/constants/enums/privacy"

import { PostImageType } from "@/schemas/post-schema"

import PostImage from "./post-image"

const HASHTAG_SUGGESTIONS = [
  "photography",
  "travel",
  "food",
  "nature",
  "art",
  "technology",
  "fitness",
  "lifestyle",
  "music",
  "design",
  "coding",
  "startup",
  "business",
  "health",
  "education",
  "gaming",
  "sports",
  "fashion"
] as const

const MAX_HASHTAG_COUNT = 10
const MAX_CAPTION_CHARACTERS = 2000
const HASHTAG_SUGGESTION_DISPLAY_LIMIT = 6

function NewPost() {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const [isPostExpanded, setIsPostExpanded] = useState(false)
  const [isHashtagSectionVisible, setIsHashtagSectionVisible] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const [selectedPrivacy, setSelectedPrivacy] = useState<Privacy>(Privacy.PUBLIC)
  const [captionText, setCaptionText] = useState("")
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [currentHashtagInput, setCurrentHashtagInput] = useState("")

  const [uploadedImageFiles, setUploadedImageFiles] = useState<File[]>([])
  const [processedPostImages, setProcessedPostImages] = useState<PostImageType[]>([])

  const privacyConfig = getPrivacyInfo(selectedPrivacy)
  const PrivacyIcon = privacyConfig.icon

  const canAddMoreHashtags = selectedHashtags.length < MAX_HASHTAG_COUNT

  const filteredHashtagSuggestions = HASHTAG_SUGGESTIONS.filter(
    (suggestion) => !selectedHashtags.includes(suggestion)
  )
    .filter((suggestion) => suggestion.includes(currentHashtagInput.toLowerCase()))
    .slice(0, HASHTAG_SUGGESTION_DISPLAY_LIMIT)

  const shouldShowHashtagSuggestions = filteredHashtagSuggestions.length > 0

  const sanitizeHashtagInput = useCallback((input: string): string => {
    return input.replace(/^#/, "").trim().toLowerCase()
  }, [])

  const processImageFile = useCallback((file: File): Promise<PostImageType> => {
    return new Promise((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = (loadEvent) => {
        const imageDataUrl = loadEvent.target?.result as string
        const postImage: PostImageType = {
          url: imageDataUrl,
          altText: file.name
        }
        resolve(postImage)
      }
      fileReader.readAsDataURL(file)
    })
  }, [])

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const filesToProcess = Array.from(files).filter((file) => file.type.startsWith("image/"))
      if (filesToProcess.length === 0) return

      const processedImages = await Promise.all(
        filesToProcess.map((file) => processImageFile(file))
      )

      setUploadedImageFiles((prev) => [...prev, ...filesToProcess])
      setProcessedPostImages((prev) => [...prev, ...processedImages])

      if (!isPostExpanded) {
        setIsPostExpanded(true)
      }
    },
    [processImageFile, isPostExpanded]
  )

  const handlePostExpansion = useCallback(() => {
    setIsPostExpanded(true)
  }, [])

  const handlePostCancellation = useCallback(() => {
    setIsPostExpanded(false)
    setSelectedHashtags([])
    setCurrentHashtagInput("")
    setUploadedImageFiles([])
    setProcessedPostImages([])
    setCaptionText("")
  }, [])

  const handlePrivacySelection = useCallback((newPrivacy: Privacy) => {
    setSelectedPrivacy(newPrivacy)
  }, [])

  const handleCaptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCaption = event.target.value.slice(0, MAX_CAPTION_CHARACTERS)
    setCaptionText(newCaption)
  }, [])

  const handleImageSelection = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
      if (!selectedFiles) return

      await processFiles(selectedFiles)

      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
    },
    [processFiles]
  )

  const handleImageRemoval = useCallback((indexToRemove: number) => {
    setUploadedImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
    setProcessedPostImages((prev) => prev.filter((_, index) => index !== indexToRemove))
  }, [])

  const handleAllImagesClearing = useCallback(() => {
    setUploadedImageFiles([])
    setProcessedPostImages([])
  }, [])

  const triggerImageSelection = useCallback(() => {
    imageInputRef.current?.click()
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!dropZoneRef.current?.contains(event.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }, [])

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragOver(false)

      const files = event.dataTransfer.files
      if (files.length > 0) {
        await processFiles(files)
      }
    },
    [processFiles]
  )

  const toggleHashtagSection = useCallback(() => {
    setIsHashtagSectionVisible((prev) => !prev)
  }, [])

  const addHashtagToSelection = useCallback(
    (hashtagInput: string) => {
      const sanitizedTag = sanitizeHashtagInput(hashtagInput)

      const isValidTag = sanitizedTag.length > 0
      const isUniqueTag = !selectedHashtags.includes(sanitizedTag)
      const hasAvailableSlots = canAddMoreHashtags

      if (isValidTag && isUniqueTag && hasAvailableSlots) {
        setSelectedHashtags((prev) => [...prev, sanitizedTag])
        setCurrentHashtagInput("")
      }
    },
    [selectedHashtags, canAddMoreHashtags, sanitizeHashtagInput]
  )

  const removeHashtagFromSelection = useCallback((hashtagToRemove: string) => {
    setSelectedHashtags((prev) => prev.filter((tag) => tag !== hashtagToRemove))
  }, [])

  const handleHashtagInputKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event
      const isSubmissionKey = ["Enter", " ", ","].includes(key)
      const isBackspaceKey = key === "Backspace"

      if (isSubmissionKey) {
        event.preventDefault()
        if (currentHashtagInput.trim()) {
          addHashtagToSelection(currentHashtagInput)
        }
      } else if (isBackspaceKey && !currentHashtagInput && selectedHashtags.length > 0) {
        setSelectedHashtags((prev) => prev.slice(0, -1))
      }
    },
    [currentHashtagInput, selectedHashtags, addHashtagToSelection]
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
      {isDragOver && (
        <div className="bg-primary/10 absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            <Upload size={40} color="var(--primary)" />
            <p className="text-primary text-lg font-medium">Drop images here to upload</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarImage
            src="https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
            alt="Zotaeus"
          />
          <AvatarFallback>{"Zotaeus".charAt(0)}</AvatarFallback>
        </Avatar>

        {!isPostExpanded ? (
          <>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Share your thoughts with the world..."
                onFocus={handlePostExpansion}
                className="w-full cursor-pointer"
              />

              <PencilLine
                size={16}
                color="var(--primary)"
                className="absolute top-2.5 right-3 opacity-70"
              />
            </div>

            <Button variant="default" onClick={handlePostExpansion}>
              Share
            </Button>
          </>
        ) : (
          <div className="flex w-full items-center justify-between gap-4">
            <div>
              <h3 className="text-foreground w-fit cursor-pointer text-sm font-semibold">
                Văn Hữu Toàn
              </h3>
              <p className="text-muted-foreground text-xs">Củ Chi</p>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="cursor-default font-normal">
                    <PrivacyIcon size={16} color="var(--primary)" className="opacity-70" />
                    {privacyConfig.label}
                    <ChevronDown size={20} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="max-w-64">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handlePrivacySelection(Privacy.PUBLIC)}>
                      <Globe size={16} color="var(--primary)" className="opacity-70" />
                      <span>Public</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handlePrivacySelection(Privacy.PRIVATE)}>
                      <LockKeyhole size={16} color="var(--primary)" className="opacity-70" />
                      <span>Private</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handlePrivacySelection(Privacy.FOLLOWERS_ONLY)}
                    >
                      <Users size={16} color="var(--primary)" className="opacity-70" />
                      <span>Followers Only</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="sm"
                onClick={handlePostCancellation}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {isPostExpanded && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="caption">Caption</Label>
              <span className="text-muted-foreground text-xs">
                {captionText.length}/{MAX_CAPTION_CHARACTERS}
              </span>
            </div>

            <Textarea
              value={captionText}
              onChange={handleCaptionChange}
              placeholder="Share your thoughts with the world..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" className="font-normal">
              <MapPin size={12} color="var(--primary)" />
              Location
            </Button>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelection}
              className="hidden"
            />

            <Button
              type="button"
              variant={uploadedImageFiles.length > 0 ? "default" : "outline"}
              size="sm"
              onClick={triggerImageSelection}
              className="font-normal"
            >
              <ImageIcon
                size={12}
                color={uploadedImageFiles.length > 0 ? "var(--foreground)" : "var(--primary)"}
              />
              Upload
            </Button>

            <Button
              type="button"
              variant={isHashtagSectionVisible ? "default" : "outline"}
              size="sm"
              onClick={toggleHashtagSection}
              className="font-normal"
            >
              <Hash
                size={12}
                color={isHashtagSectionVisible ? "var(--foreground)" : "var(--primary)"}
              />
              Hashtag
            </Button>
          </div>

          {processedPostImages.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Images ({processedPostImages.length})</Label>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleAllImagesClearing}
                  className="font-normal"
                >
                  <Trash2 size={12} />
                  Clear all
                </Button>
              </div>

              <PostImage
                images={processedPostImages}
                priority
                onImageRemove={handleImageRemoval}
                showDeleteButtons
              />
            </div>
          )}

          {isHashtagSectionVisible && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="hashtags">Hashtags</Label>
                <span className="text-muted-foreground text-xs">
                  {selectedHashtags.length}/{MAX_HASHTAG_COUNT}
                </span>
              </div>

              <div className="space-y-3">
                <div className="border-input dark:bg-input/20 flex flex-wrap items-center gap-x-2 gap-y-0 rounded-md border bg-transparent px-3 py-1 shadow-xs">
                  {selectedHashtags.map((hashtag) => (
                    <Badge key={hashtag} variant="default" className="rounded-sm">
                      #{hashtag}
                      <span onClick={() => removeHashtagFromSelection(hashtag)}>
                        <X size={14} className="cursor-pointer" />
                      </span>
                    </Badge>
                  ))}

                  <Input
                    id="hashtags"
                    value={currentHashtagInput}
                    onChange={(e) => setCurrentHashtagInput(e.target.value)}
                    onKeyDown={handleHashtagInputKeyPress}
                    placeholder={
                      selectedHashtags.length === 0 ? "Add hashtags..." : "Add more hashtags..."
                    }
                    className="min-w-[120px] flex-1 border-0 bg-transparent p-0 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
                  />
                </div>

                {shouldShowHashtagSuggestions && (
                  <div className="flex flex-wrap gap-2">
                    {filteredHashtagSuggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addHashtagToSelection(suggestion)}
                        className="h-7 text-xs"
                      >
                        #{suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <Button variant="default" className="mt-2 w-full">
            Share
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewPost

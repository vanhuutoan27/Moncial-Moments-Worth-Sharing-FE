"use client"

import React, { useCallback, useEffect, useState } from "react"

import Image from "next/image"

import useEmblaCarousel from "embla-carousel-react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

import { PostImageType } from "@/schemas/post-schema"

const ASPECT_RATIOS = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-video"
}

interface PostImageProps {
  images: PostImageType[]
  aspectRatio?: "square" | "portrait" | "landscape" | "wide"
  priority?: boolean
  onImageRemove?: (index: number) => void
  showDeleteButtons?: boolean
  className?: string
}

export function PostImage({
  images,
  aspectRatio = "portrait",
  priority = false,
  onImageRemove,
  showDeleteButtons = false,
  className = ""
}: PostImageProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return

    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]))
  }

  const handleImageRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onImageRemove) {
      onImageRemove(index)
    }
  }

  if (images.length === 0) {
    return null
  }

  if (images.length === 1) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md",
          ASPECT_RATIOS[aspectRatio],
          className
        )}
      >
        {!loadedImages.has(0) && <Skeleton className="absolute inset-0 h-full w-full" />}

        <Image
          src={images[0].url}
          alt={images[0].altText || "Post image"}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => handleImageLoad(0)}
          className={cn(
            "object-cover transition-opacity duration-300",
            !loadedImages.has(0) && "opacity-0",
            loadedImages.has(0) && "opacity-100"
          )}
        />

        {showDeleteButtons && onImageRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => handleImageRemove(0, e)}
            className="transition-color absolute top-2 right-2 z-20 bg-black/50 text-white duration-300 hover:text-black"
          >
            <X size={14} />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn("relative min-w-0 flex-[0_0_100%]", ASPECT_RATIOS[aspectRatio])}
            >
              {!loadedImages.has(index) && <Skeleton className="absolute inset-0 h-full w-full" />}

              <Image
                src={image.url}
                alt={image.altText || `Post image ${index + 1}`}
                fill
                priority={priority && index === 0}
                loading={priority && index === 0 ? "eager" : "lazy"}
                onLoad={() => handleImageLoad(index)}
                className={cn(
                  "object-cover transition-opacity duration-300",
                  !loadedImages.has(index) && "opacity-0",
                  loadedImages.has(index) && "opacity-100"
                )}
              />

              {showDeleteButtons && onImageRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleImageRemove(index, e)}
                  className="transition-color absolute top-2 right-2 z-20 bg-black/50 text-white duration-300 hover:text-black"
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 space-x-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "transition-color size-2 rounded-full duration-300",
                index === selectedIndex ? "bg-white" : "bg-white/20 hover:bg-white/50"
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}

      {images.length > 1 && !showDeleteButtons && (
        <div className="absolute top-2 right-2 z-10 rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur select-none">
          {selectedIndex + 1}/{images.length}
        </div>
      )}
    </div>
  )
}

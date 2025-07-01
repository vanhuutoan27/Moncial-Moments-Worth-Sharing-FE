"use client"

import React from "react"

import { X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const HASHTAGS = [
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

interface HashtagSectionProps {
  hashtags: string[]
  hashtagInput: string
  onHashtagInputChange: (value: string) => void
  onAddHashtag: (tag: string) => void
  onRemoveHashtag: (tag: string) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function HashtagSection({
  hashtags,
  hashtagInput,
  onHashtagInputChange,
  onAddHashtag,
  onRemoveHashtag,
  onKeyPress
}: HashtagSectionProps) {
  const t = useTranslations("app.post.compose.form.fields.hashtags")

  const filteredHashtagSuggestions = HASHTAGS.filter((tag) => !hashtags.includes(tag))
    .filter((tag) => tag.includes(hashtagInput.toLowerCase()))
    .slice(0, 6)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="hashtags">{t("label")}</Label>

        <span className="text-muted-foreground text-xs">{hashtags.length}/10</span>
      </div>

      <div className="space-y-3">
        <div className="border-input dark:bg-input/20 flex flex-wrap items-center gap-x-2 gap-y-0 rounded-md border bg-transparent px-3 py-1 shadow-xs">
          {hashtags.map((hashtag) => (
            <Badge key={hashtag} variant="default" className="rounded-sm">
              #{hashtag}
              <span onClick={() => onRemoveHashtag(hashtag)}>
                <X size={14} className="cursor-pointer" />
              </span>
            </Badge>
          ))}

          <Input
            id="hashtags"
            value={hashtagInput}
            onChange={(e) => onHashtagInputChange(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder={t("placeholder")}
            className="min-w-[120px] flex-1 border-0 bg-transparent p-0 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
          />
        </div>

        {filteredHashtagSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filteredHashtagSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onAddHashtag(suggestion)}
                className="h-7 text-xs"
              >
                #{suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HashtagSection

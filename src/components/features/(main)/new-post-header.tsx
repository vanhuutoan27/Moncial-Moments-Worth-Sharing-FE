"use client"

import React from "react"

import { ChevronDown, Globe, LockKeyhole, Users, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { getPrivacyInfo, Privacy } from "@/constants/enums/privacy"

interface NewPostHeaderProps {
  privacy: Privacy
  onPrivacyChange: (privacy: Privacy) => void
  onCancel: () => void
}

function NewPostHeader({ privacy, onPrivacyChange, onCancel }: NewPostHeaderProps) {
  const t = useTranslations("app.post.compose")

  const privacyConfig = getPrivacyInfo(privacy)
  const PrivacyIcon = privacyConfig.icon

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="space-y-0.5">
        <h3 className="text-foreground w-fit cursor-pointer text-sm font-semibold">Văn Hữu Toàn</h3>

        <p className="text-muted-foreground text-xs">
          <span className="cursor-pointer underline-offset-4 hover:underline">@vanhuutoan27</span> •
          Củ Chi
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" className="cursor-default">
              <PrivacyIcon size={16} color="var(--primary)" className="opacity-70" />
              {t(`visibility.${privacy.toLowerCase()}`)}
              <ChevronDown size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onPrivacyChange(Privacy.PUBLIC)}>
                <Globe size={16} color="var(--primary)" className="opacity-70" />
                <span>{t("visibility.public")}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onPrivacyChange(Privacy.PRIVATE)}>
                <LockKeyhole size={16} color="var(--primary)" className="opacity-70" />
                <span>{t("visibility.private")}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onPrivacyChange(Privacy.FOLLOWERS_ONLY)}>
                <Users size={16} color="var(--primary)" className="opacity-70" />
                <span>{t("visibility.friends")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={16} className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default NewPostHeader

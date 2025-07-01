"use client"

import { useCallback, useTransition } from "react"

import { useRouter } from "next/navigation"

import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { useTranslations } from "next-intl"

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "../ui/dropdown-menu"

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" }
] as const

export function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("app.header.menu.items")

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      startTransition(() => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`

        window.location.reload()
      })
    },
    [router]
  )

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger disabled={isPending}>
          <Languages size={16} color="var(--primary)" className="opacity-70" />
          <span>{t("language")}</span>
        </DropdownMenuSubTrigger>

        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {LANGUAGES.map((language) => (
              <DropdownMenuItem
                key={language.code}
                disabled={isPending}
                onClick={() => handleLanguageChange(language.code)}
                className={`${locale === language.code ? "bg-border" : ""}`}
              >
                <span className="text-primary/70">{language.flag}</span>
                <span>{language.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}

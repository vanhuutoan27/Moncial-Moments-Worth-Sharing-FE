"use client"

import { useCallback } from "react"

import { ChevronDown, Layers2, LogOut, UserPen } from "lucide-react"
import { useTranslations } from "next-intl"

import { ZOTAEUS } from "@/constants/app"

import { LanguageSelector } from "../shared/language-selector"
import { ThemeSelector } from "../shared/theme-selector"
import UserAvatar from "../shared/user-avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"

const ROUTES = [
  { labelKey: "profile", icon: UserPen },
  { labelKey: "settings", icon: Layers2 }
] as const

function UserMenu() {
  const t = useTranslations("app.header.menu.items")

  const handleLogout = useCallback(() => {
    console.log("Logging out...")
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent"
        >
          <div className="relative">
            <UserAvatar
              user={{
                fullName: ZOTAEUS.fullName,
                avatarUrl: ZOTAEUS.avatarUrl
              }}
              size="sm"
            />

            <span className="border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-green-600" />
          </div>

          <ChevronDown size={16} color="var(--primary)" className="opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">Zotaeus</span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            zotaeus@gmail.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {ROUTES.map((route, index) => {
            const Icon = route.icon

            return (
              <DropdownMenuItem key={index}>
                <Icon size={16} color="var(--primary)" className="opacity-70" />
                <span>{t(route.labelKey)}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <ThemeSelector />

        <LanguageSelector />

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut size={16} color="var(--destructive)" className="opacity-70" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu

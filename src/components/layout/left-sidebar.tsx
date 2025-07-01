"use client"

import React, { useCallback, useMemo } from "react"

import { usePathname } from "next/navigation"

import {
  Bell,
  Bookmark,
  Calendar,
  Home,
  Info,
  MessageCircle,
  Search,
  Settings,
  TrendingUp,
  User,
  Users
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import SidebarGroup from "./sidebar-group"

function LeftSidebar() {
  const t = useTranslations("app.sidebar")

  const pathname = usePathname()

  const MAIN_ROUTES = [
    { label: t("navigation.home"), href: "/", icon: Home },
    { label: t("navigation.explore"), href: "/explore", icon: Search },
    { label: t("navigation.trending"), href: "/trending", icon: TrendingUp },
    { label: t("navigation.notifications"), href: "/notifications", icon: Bell }
  ] as const

  const SOCIAL_ROUTES = [
    { label: t("navigation.messages"), href: "/messages", icon: MessageCircle },
    { label: t("navigation.profile"), href: "/groups", icon: Users },
    { label: t("navigation.groups"), href: "/events", icon: Calendar }
  ] as const

  const PERSONAL_ROUTES = [
    { label: t("navigation.events"), href: "/profile", icon: User },
    { label: t("navigation.bookmarks"), href: "/bookmarks", icon: Bookmark }
  ] as const

  const OTHER_ROUTES = [
    { label: t("navigation.settings"), href: "/settings", icon: Settings },
    { label: t("navigation.help"), href: "/help", icon: Info }
  ] as const

  const routeGroups = useMemo(
    () => [
      { key: "main", routes: MAIN_ROUTES },
      { key: "social", routes: SOCIAL_ROUTES },
      { key: "personal", routes: PERSONAL_ROUTES },
      { key: "other", routes: OTHER_ROUTES }
    ],
    []
  )

  const handleShare = useCallback(() => {
    console.log("Share button clicked")
  }, [])

  return (
    <div>
      {routeGroups.map((group, index) => (
        <div key={group.key}>
          <SidebarGroup routes={group.routes} pathname={pathname} />
          {index < routeGroups.length - 1 && <Separator className="my-2" />}
        </div>
      ))}

      <Separator />

      <Button
        type="button"
        variant="default"
        size="lg"
        onClick={handleShare}
        className="mt-6 w-full font-semibold"
      >
        {t("actions.share")}
      </Button>
    </div>
  )
}

export default LeftSidebar

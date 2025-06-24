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

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import SidebarGroup from "./sidebar-group"

const MAIN_ROUTES = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/explore", icon: Search },
  { label: "Trending", href: "/trending", icon: TrendingUp },
  { label: "Notifications", href: "/notifications", icon: Bell }
] as const

const SOCIAL_ROUTES = [
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Groups", href: "/groups", icon: Users },
  { label: "Events", href: "/events", icon: Calendar }
] as const

const PERSONAL_ROUTES = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark }
] as const

const OTHER_ROUTES = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: Info }
] as const

function LeftSidebar() {
  const pathname = usePathname()

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
    <div className="py-10">
      {routeGroups.map((group, index) => (
        <div key={group.key}>
          <SidebarGroup routes={group.routes} pathname={pathname} />
          {index < routeGroups.length - 1 && <Separator />}
        </div>
      ))}

      <Separator />

      <Button
        type="button"
        variant="default"
        size="lg"
        onClick={handleShare}
        className="mt-4 w-full font-semibold"
      >
        Share
      </Button>
    </div>
  )
}

export default LeftSidebar

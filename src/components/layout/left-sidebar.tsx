"use client"

import React, { useCallback, useMemo } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Bell,
  Bookmark,
  Calendar,
  Home,
  Info,
  LucideIcon,
  MessageCircle,
  Search,
  Settings,
  TrendingUp,
  User,
  Users
} from "lucide-react"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

interface Route {
  label: string
  href: string
  icon: LucideIcon
}

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

interface SidebarGroupProps {
  routes: readonly Route[]
  pathname: string
}

function SidebarGroup({ routes, pathname }: SidebarGroupProps) {
  return (
    <div className="flex flex-col gap-2 py-2">
      {routes.map((route) => {
        const isActive = pathname === route.href

        return <SidebarItem key={route.href} route={route} isActive={isActive} />
      })}
    </div>
  )
}

interface SidebarItemProps {
  route: Route
  isActive: boolean
  onNavigate?: () => void
}

function SidebarItem({ route, isActive, onNavigate }: SidebarItemProps) {
  const Icon = route.icon

  const handleClick = useCallback(() => {
    if (!isActive) {
      onNavigate?.()
    }
  }, [isActive, onNavigate])

  return (
    <Button
      key={route.label}
      variant={isActive ? "default" : "ghost"}
      asChild
      onClick={handleClick}
      className="h-10 w-full justify-start gap-4"
    >
      <Link href={route.href} className="flex items-center justify-between">
        <Icon
          size={16}
          color={isActive ? "#fff" : "var(--primary)"}
          className="size-4 opacity-70"
        />
        {route.label}
      </Link>
    </Button>
  )
}

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

      <Button variant="default" size="lg" onClick={handleShare} className="mt-4 w-full">
        Share
      </Button>
    </div>
  )
}

export default LeftSidebar

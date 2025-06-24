"use client"

import React, { useCallback } from "react"

import Link from "next/link"

import { LucideIcon } from "lucide-react"

import { Button } from "../ui/button"

interface Route {
  label: string
  href: string
  icon: LucideIcon
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
      type="button"
      variant={isActive ? "default" : "ghost"}
      asChild
      onClick={handleClick}
      className="h-10 w-full justify-start gap-4 font-normal"
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

export default SidebarItem

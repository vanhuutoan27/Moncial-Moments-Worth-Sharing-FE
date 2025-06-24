"use client"

import React from "react"

import { LucideIcon } from "lucide-react"

import SidebarItem from "./sidebar-item"

interface Route {
  label: string
  href: string
  icon: LucideIcon
}

interface SidebarGroupProps {
  routes: readonly Route[]
  pathname: string
}

function SidebarGroup({ routes, pathname }: SidebarGroupProps) {
  return (
    <div className="space-y-2">
      {routes.map((route) => {
        const isActive = pathname === route.href

        return <SidebarItem key={route.href} route={route} isActive={isActive} />
      })}
    </div>
  )
}

export default SidebarGroup

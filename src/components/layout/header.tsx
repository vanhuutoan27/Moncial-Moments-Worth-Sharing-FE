"use client"

import React from "react"

import { Bell, MessageCircle, Search } from "lucide-react"
import { useTranslations } from "next-intl"

import { SpringElement } from "../animate-ui/spring-element"
import UserMenu from "../shared/user-menu"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

function Header() {
  const t = useTranslations("app.header")

  return (
    <div className="bg-background border-border sticky top-0 z-50 w-full border border-b shadow-sm">
      <div className="flex h-16 items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-40">
          <SpringElement>
            <h2 className="text-foreground cursor-pointer text-2xl font-bold tracking-wider select-none md:text-3xl">
              Mon<span className="text-primary">cial</span>
            </h2>
          </SpringElement>

          <div className="relative hidden md:block">
            <Input type="text" placeholder={t("search.placeholder")} className="w-[400px]" />

            <Search
              size={16}
              color="var(--primary)"
              className="absolute top-1/2 right-3 -translate-y-1/2 opacity-70"
            />
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden space-x-1 md:flex">
            <Button type="button" variant="ghost" size="icon" className="relative size-10">
              <MessageCircle size={20} color="var(--primary)" className="size-5 opacity-70" />
              <span className="border-background bg-destructive absolute top-1.5 right-1.5 size-3 rounded-full border-2" />
            </Button>

            <Button type="button" variant="ghost" size="icon" className="relative size-10">
              <Bell size={20} color="var(--primary)" className="size-5 opacity-70" />
              <span className="border-background bg-destructive absolute top-1.5 right-1.5 size-3 rounded-full border-2" />
            </Button>
          </div>

          <UserMenu />
        </div>
      </div>
    </div>
  )
}

export default Header

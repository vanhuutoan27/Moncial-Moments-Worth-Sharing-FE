"use client"

import React from "react"

import {
  Bell,
  ChevronDown,
  Layers2,
  LogOut,
  MessageCircle,
  Monitor,
  Moon,
  Search,
  Sun,
  SunMoon,
  UserPen
} from "lucide-react"
import { useTheme } from "next-themes"

import { SpringElement } from "../animate-ui/spring-element"
import UserAvatar from "../shared/user-avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"

const ROUTES = [
  { label: "Profile", icon: UserPen },
  { label: "Settings", icon: Layers2 }
] as const

function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-background border-border sticky top-0 z-50 w-full border shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-20">
          <SpringElement>
            <h2 className="text-foreground cursor-pointer text-2xl font-bold tracking-wider select-none md:text-3xl">
              Mon<span className="text-primary">cial</span>
            </h2>
          </SpringElement>

          <div className="relative hidden md:block">
            <Input type="text" placeholder="Search something..." className="w-[400px]" />

            <Search
              size={16}
              color="var(--primary)"
              className="absolute top-2.5 right-3 opacity-70"
            />
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden space-x-1 md:flex">
            {/* <Button variant="ghost" size="icon" className="size-10">
              <Home size={20} color="var(--primary)" className="size-5 opacity-70" />
            </Button>

            <Button variant="ghost" size="icon" className="size-10">
              <Users size={20} color="var(--primary)" className="size-5 opacity-70" />
            </Button> */}

            <Button variant="ghost" size="icon" className="relative size-10">
              <MessageCircle size={20} color="var(--primary)" className="size-5 opacity-70" />
              <span className="border-background bg-destructive absolute top-1.5 right-1.5 size-3 rounded-full border-2" />
            </Button>

            <Button variant="ghost" size="icon" className="relative size-10">
              <Bell size={20} color="var(--primary)" className="size-5 opacity-70" />
              <span className="border-background bg-destructive absolute top-1.5 right-1.5 size-3 rounded-full border-2" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent"
              >
                <div className="relative">
                  <UserAvatar
                    user={{
                      fullName: "Zotaeus",
                      avatarUrl:
                        "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
                    }}
                    size="sm"
                  />

                  <span className="border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-emerald-500" />
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
                      <span>{route.label}</span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <SunMoon size={16} color="var(--primary)" className="opacity-70" />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => setTheme("light")}
                        className={`cursor-pointer ${theme === "light" ? "bg-border" : ""}`}
                      >
                        <Sun size={16} color="var(--primary)" className="opacity-70" />
                        <span>Light</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setTheme("dark")}
                        className={`cursor-pointer ${theme === "dark" ? "bg-border" : ""}`}
                      >
                        <Moon size={16} color="var(--primary)" className="opacity-70" />
                        <span>Dark</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => setTheme("system")}
                        className={`cursor-pointer ${theme === "system" ? "bg-border" : ""}`}
                      >
                        <Monitor size={16} color="var(--primary)" className="opacity-70" />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                <LogOut size={16} color="var(--destructive)" className="opacity-70" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Header

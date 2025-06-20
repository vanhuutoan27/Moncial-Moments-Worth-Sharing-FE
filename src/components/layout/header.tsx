"use client"

import React from "react"

import {
  Bell,
  Bolt,
  BookOpen,
  ChevronDown,
  Layers2,
  LogOut,
  MessageCircle,
  Pin,
  Search,
  UserPen
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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
import { Input } from "../ui/input"

function Header() {
  return (
    <div className="bg-background border-border sticky top-0 z-50 w-full border shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2">
        <div className="flex items-center gap-12">
          <h2 className="cursor-pointer text-2xl font-bold tracking-wider text-black">
            Mon<span className="text-secondary">cial</span>
          </h2>

          <div className="relative">
            <Input type="text" placeholder="Search something..." className="w-[400px]" />

            <Search
              size={16}
              color="var(--primary)"
              className="absolute top-2.5 right-3 opacity-70"
            />
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="space-x-1">
            <Button variant="ghost" size="icon" className="relative rounded-full duration-300">
              <MessageCircle size={20} color="var(--primary)" className="opacity-70" />
              <span className="border-background absolute top-1.5 right-1.5 size-3 rounded-full border-2 bg-sky-700" />
            </Button>

            <Button variant="ghost" size="icon" className="relative rounded-full duration-300">
              <Bell size={20} color="var(--primary)" className="opacity-70" />
              <span className="border-background absolute top-1.5 right-1.5 size-3 rounded-full border-2 bg-sky-700" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="focus-visible:ring-ring/0 hover:bg-transparent"
              >
                <Avatar>
                  <AvatarImage
                    src="https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
                    alt="Zotaeus"
                  />
                  <AvatarFallback>Z</AvatarFallback>
                </Avatar>
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
                <DropdownMenuItem>
                  <Bolt size={16} color="var(--primary)" className="opacity-70" />
                  <span>Option 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Layers2 size={16} color="var(--primary)" className="opacity-70" />
                  <span>Option 2</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen size={16} color="var(--primary)" className="opacity-70" />
                  <span>Option 3</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Pin size={16} color="var(--primary)" className="opacity-70" />
                  <span>Option 4</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPen size={16} color="var(--primary)" className="opacity-70" />
                  <span>Option 5</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                <LogOut size={16} color="var(--primary)" className="opacity-70" />
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

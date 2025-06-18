import React from "react"

import {
  ArrowRight,
  BellRing,
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  MessageCircle,
  Search,
  UsersRound
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
    <div className="flex h-16 items-center justify-between gap-2">
      <div className="flex w-full items-center gap-2 md:gap-10">
        <h2 className="text-3xl font-bold">
          Mon<span>cial</span>
        </h2>

        <div className="*:not-first:mt-2">
          <div className="relative">
            <Input
              id="search"
              className="peer w-[150px] ps-9 pe-9 md:w-[400px]"
              placeholder="Search..."
              type="text"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <Search size={16} />
            </div>
            <button
              className="text-primary hover:text-primary/30 focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] duration-300 outline-none hover:cursor-pointer focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Submit search"
              type="submit"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <UsersRound
            size={16}
            className="hover:text-primary/30 text-primary duration-300 hover:cursor-pointer"
          />

          <MessageCircle
            size={16}
            className="hover:text-primary/30 text-primary duration-300 hover:cursor-pointer"
          />

          <BellRing
            size={16}
            className="hover:text-primary/30 text-primary duration-300 hover:cursor-pointer"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <Avatar>
                <AvatarImage
                  src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg"
                  alt="Profile image"
                />
                <AvatarFallback className="items-center justify-center border">KK</AvatarFallback>
              </Avatar>
              <ChevronDownIcon size={18} className="opacity-60" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-64 min-w-52">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
              <span className="text-foreground truncate text-sm font-medium">
                Khải Tỏi đẹp trai
              </span>
              <span className="text-muted-foreground truncate text-xs font-normal">
                PhanKhai@gmail.com
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                <BoltIcon size={16} className="text-primary" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Layers2Icon size={16} className="text-primary" />
                <span>Setting</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer">
                <BookOpenIcon size={16} className="text-primary" />
                <span>Feedback</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer">
              <LogOutIcon size={16} className="text-destructive" />
              <span className="text-destructive">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Header

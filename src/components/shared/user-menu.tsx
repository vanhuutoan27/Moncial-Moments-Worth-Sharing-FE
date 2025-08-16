"use client"

import { useCallback, useEffect, useState } from "react"

import { ChevronDown, Layers2, LogOut, UserPen } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { ZOTAEUS } from "@/constants/app"

import { AuthorType } from "@/validations/user.validation"

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
  const { data: session, status } = useSession()
  const t = useTranslations("app.header.menu.items")

  const [userData, setUserData] = useState<Omit<AuthorType, "id" | "username"> | null>(null)

  useEffect(() => {
    if (status === "loading") return

    if (session) {
      setUserData({
        fullName: session.user?.name || "",
        avatarUrl: session.user?.image || ""
      })
    } else {
      setUserData({
        fullName: ZOTAEUS.fullName,
        avatarUrl: ZOTAEUS.avatarUrl
      })
    }
  }, [session, status])

  const handleLogout = useCallback(async () => {
    try {
      toast.loading("Logging out...")

      await signOut({
        callbackUrl: "/login",
        redirect: true
      })

      toast.success("Logged out successfully!")
    } catch (error) {
      toast.error("Logout failed. Please try again.")
      console.error("Logout error:", error)
    }
  }, [])

  return (
    <DropdownMenu modal={false}>
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
                fullName: userData?.fullName || "",
                avatarUrl: userData?.avatarUrl || ""
              }}
              size="sm"
            />

            <span
              className={`border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 ${
                session ? "bg-green-600" : "bg-gray-400"
              }`}
            />
          </div>

          <ChevronDown size={16} color="var(--primary)" className="opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{userData?.fullName || "Guest"}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {session ? session.user?.email : "Not logged in"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {session && (
          <>
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
          </>
        )}

        <ThemeSelector />

        <LanguageSelector />

        <DropdownMenuSeparator />

        {session ? (
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <LogOut size={16} color="var(--destructive)" className="opacity-70" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => (window.location.href = "/login")}>
            <LogOut size={16} color="var(--primary)" className="opacity-70" />
            <span>Login</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu

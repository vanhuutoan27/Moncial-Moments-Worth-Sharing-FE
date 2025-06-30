"use client"

import { Monitor, Moon, Sun, SunMoon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "../ui/dropdown-menu"

const THEMES = [
  { labelKey: "options.light", value: "light", icon: Sun },
  { labelKey: "options.dark", value: "dark", icon: Moon },
  { labelKey: "options.system", value: "system", icon: Monitor }
] as const

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("app.header.menu.theme")

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <SunMoon size={16} color="var(--primary)" className="opacity-70" />
          <span>{t("title")}</span>
        </DropdownMenuSubTrigger>

        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {THEMES.map((themeOption, index) => {
              const Icon = themeOption.icon

              return (
                <div key={themeOption.value}>
                  <DropdownMenuItem
                    onClick={() => setTheme(themeOption.value)}
                    className={`${theme === themeOption.value ? "bg-border" : ""}`}
                  >
                    <Icon size={16} color="var(--primary)" className="opacity-70" />
                    <span>{t(themeOption.labelKey)}</span>
                  </DropdownMenuItem>

                  {index < THEMES.length - 1 && themeOption.value === "dark" && (
                    <DropdownMenuSeparator />
                  )}
                </div>
              )
            })}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}

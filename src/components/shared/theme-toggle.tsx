"use client"

import React, { useCallback } from "react"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../ui/button"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Moon size={16} color="var(--primary)" className="opacity-70" />
      ) : (
        <Sun size={16} color="var(--primary)" className="opacity-70" />
      )}
    </Button>
  )
}

export default ThemeToggle

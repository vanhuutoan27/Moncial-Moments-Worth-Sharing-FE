"use client"

import React from "react"

import Header from "@/components/layout/header"
import Nav from "@/components/layout/nav"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="bg-background border-b px-6">
        <Header />
      </div>

      <main className="bg-background mx-auto">{children}</main>
    </div>
  )
}

export default MainLayout

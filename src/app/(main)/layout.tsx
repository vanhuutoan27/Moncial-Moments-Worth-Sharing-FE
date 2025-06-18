"use client"

import React from "react"

import Header from "@/components/layout/header"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main>{children}</main>
    </div>
  )
}

export default MainLayout

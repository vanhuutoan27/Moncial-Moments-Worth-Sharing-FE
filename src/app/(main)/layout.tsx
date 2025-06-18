"use client"

import React from "react"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}

      <main className="bg-background container mx-auto">{children}</main>
    </div>
  )
}

export default MainLayout

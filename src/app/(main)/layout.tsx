"use client"

import React from "react"

import Header from "@/components/layout/header"
import LeftSidebar from "@/components/layout/left-sidebar"
import RightSidebar from "@/components/layout/right-sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <div className="flex">
        <aside className="border-border bg-background fixed top-16 left-0 z-40 hidden h-[calc(100vh-64px)] w-64 border-r px-4 lg:block">
          <LeftSidebar />
        </aside>

        <main className="flex-1 px-4 py-10 pb-20 lg:mx-64 lg:pb-10">{children}</main>

        <aside className="border-border bg-background fixed top-16 right-0 z-40 hidden h-[calc(100vh-64px)] w-64 border-l px-4 lg:block">
          <RightSidebar />
        </aside>
      </div>

      {/* <div className="border-border bg-background/95 fixed right-0 bottom-0 left-0 z-50 h-16 border-t px-4 backdrop-blur lg:hidden">
        <BottomNavigation />
      </div> */}
    </div>
  )
}

export default MainLayout

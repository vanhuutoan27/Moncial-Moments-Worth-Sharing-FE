"use client"

import React from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <main className="flex-1 px-4 py-10 pb-20 lg:mx-64 lg:pb-10">{children}</main>
    </div>
  )
}

export default AdminLayout

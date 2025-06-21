"use client"

import React from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto my-10">{children}</main>
    </div>
  )
}

export default AdminLayout

"use client"

import React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto my-10">{children}</main>
    </div>
  )
}

export default AuthLayout

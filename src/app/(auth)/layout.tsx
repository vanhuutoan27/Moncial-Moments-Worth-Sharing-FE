"use client"

import React, { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default AuthLayout

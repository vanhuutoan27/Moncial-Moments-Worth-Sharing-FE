"use client"

import React, { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <main className="flex-1 px-4 py-10 pb-20 lg:mx-64 lg:pb-10">{children}</main>
    </div>
  )
}

export default AuthLayout

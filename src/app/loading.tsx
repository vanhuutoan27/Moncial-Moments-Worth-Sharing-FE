"use client"

import React from "react"

import { HashLoader } from "react-spinners"

function LoadingPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <HashLoader color="var(--primary)" size={70} />
    </div>
  )
}

export default LoadingPage

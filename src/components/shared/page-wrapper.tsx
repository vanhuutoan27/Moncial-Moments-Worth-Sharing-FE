"use client"

import React, { ReactNode, useState } from "react"

import SplashScreen from "./splash-screen"

interface PageWrapperProps {
  children: ReactNode
  showSplash?: boolean
  splashDuration?: number
}

function PageWrapper({ children, showSplash = true, splashDuration = 1000 }: PageWrapperProps) {
  const [splashComplete, setSplashComplete] = useState<boolean>(!showSplash)
  const [contentReady, setContentReady] = useState<boolean>(!showSplash)

  const handleSplashComplete = () => {
    setSplashComplete(true)
    setTimeout(() => {
      setContentReady(true)
    }, 100)
  }

  if (showSplash && !splashComplete) {
    return <SplashScreen onComplete={handleSplashComplete} duration={splashDuration} />
  }

  return (
    <div
      className={`transition-opacity duration-500 ${contentReady ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </div>
  )
}

export default PageWrapper

"use client"

import React, { ReactNode, useState } from "react"

import SplashScreen from "./splash-screen"

interface PageWrapperProps {
  children: ReactNode
  showSplash?: boolean
  splashDuration?: number
}

function PageWrapper({ children, showSplash = true, splashDuration = 2000 }: PageWrapperProps) {
  const [splashComplete, setSplashComplete] = useState<boolean>(!showSplash)
  const [contentReady, setContentReady] = useState<boolean>(!showSplash)

  const handleSplashComplete = () => {
    setSplashComplete(true)
    setTimeout(() => {
      setContentReady(true)
    }, 100)
  }

  return (
    <>
      {showSplash && !splashComplete && (
        <SplashScreen onComplete={handleSplashComplete} duration={splashDuration} />
      )}

      <div
        className={`transition-all duration-500 ${
          contentReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default PageWrapper

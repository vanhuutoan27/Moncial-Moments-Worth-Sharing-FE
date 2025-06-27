"use client"

import React, { useState } from "react"

import SplashScreen from "./splash-screen"

interface AppContentProps {
  children: React.ReactNode
}

function AppContent({ children }: AppContentProps) {
  const [showSplash, setShowSplash] = useState<boolean>(true)
  const [contentReady, setContentReady] = useState<boolean>(false)

  const handleSplashComplete = () => {
    setShowSplash(false)
    setTimeout(() => {
      setContentReady(true)
    }, 100)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

      <div
        className={`transition-all duration-300 ${
          contentReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default AppContent

"use client"

import React, { useEffect, useState } from "react"

import { HashLoader } from "react-spinners"

interface SplashScreenProps {
  onComplete: () => void
  duration?: number
}

function SplashScreen({ onComplete, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <HashLoader color="var(--primary)" size={70} />
    </div>
  )
}

export default SplashScreen

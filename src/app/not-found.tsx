"use client"

import React from "react"

import { useRouter } from "next/navigation"

import SadWhale from "@/components/shared/sad-whale"

import { Button } from "@/components/ui/button"

function NotFoundPage() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-6">
      <SadWhale />

      <div className="max-w-xl space-y-2 text-center">
        <h3 className="text-primary text-2xl font-bold">Oops! This page has swum away 🐋</h3>

        <p className="text-muted-foreground">
          It looks like this link no longer exists or has been moved. Don&apos;t worry, head back to
          the homepage to discover other amazing posts!
        </p>
      </div>

      <div className="space-x-4">
        <Button type="button" variant="outline" onClick={handleGoBack}>
          Go Back
        </Button>

        <Button type="button" variant="default" onClick={handleGoHome}>
          Go Home
        </Button>
      </div>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Moncial • Where beautiful moments are shared
      </p>
    </div>
  )
}

export default NotFoundPage

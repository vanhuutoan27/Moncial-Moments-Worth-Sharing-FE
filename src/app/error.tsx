"use client"

import React from "react"

import { useRouter } from "next/navigation"

import SadWhale from "@/components/shared/sad-whale"

import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  error?: Error & { digest?: string }
  reset?: () => void
}

function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleTryAgain = () => {
    if (reset) {
      reset()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center space-y-6">
      <SadWhale />

      <div className="max-w-xl space-y-2 text-center">
        <h3 className="text-primary text-2xl font-bold">Something went wrong! 🌊</h3>

        <p className="text-muted-foreground">
          We encountered an unexpected error. Our team has been notified and is working to fix this.
          Please try again or return to the homepage.
        </p>

        {error && (
          <details className="mx-auto mt-4 max-w-md rounded-lg bg-gray-50 p-3 text-left">
            <summary className="mb-2 cursor-pointer text-sm font-medium text-gray-700">
              Error Details
            </summary>
            <code className="text-xs break-words text-red-600">
              {error.message || "Unknown error occurred"}
            </code>

            {error.digest && <p className="mt-1 text-xs text-gray-500">Error ID: {error.digest}</p>}
          </details>
        )}
      </div>

      <div className="space-x-4">
        <Button type="button" variant="outline" onClick={handleGoBack}>
          Go Back
        </Button>

        <Button type="button" variant="outline" onClick={handleTryAgain}>
          Try Again
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

export default ErrorPage

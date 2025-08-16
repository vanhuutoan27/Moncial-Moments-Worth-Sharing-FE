"use client"

import { useState } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AxiosError } from "axios"

interface QueryProviderProps {
  children: React.ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: (failureCount, error) => {
              if (
                error instanceof AxiosError &&
                error.response?.status &&
                error.response.status >= 400 &&
                error.response.status < 500
              ) {
                return false
              }

              return failureCount < 2
            },
            refetchOnWindowFocus: false,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
          },
          mutations: {
            retry: (failureCount, error) => {
              if (
                error instanceof AxiosError &&
                error.response?.status &&
                error.response.status >= 400 &&
                error.response.status < 500
              ) {
                return false
              }
              return failureCount < 1
            }
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

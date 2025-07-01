"use client"

import React from "react"

import Link from "next/link"

import { useTranslations } from "next-intl"

import LoginForm from "@/components/forms/login-form"

import AnimatedBlob from "@/components/shared/animated-blob"
import ThemeToggle from "@/components/shared/theme-toggle"

function LoginPage() {
  const t = useTranslations("app.auth.login")

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex justify-center md:justify-start">
            <h2 className="text-foreground cursor-pointer text-2xl font-bold tracking-wider select-none md:text-3xl">
              Mon<span className="text-primary">cial</span>
            </h2>
          </Link>

          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-xs">
                {t("legal.agreement")}{" "}
                <Link href="#" className="text-primary text-sm">
                  {t("legal.links.termsOfService")}
                </Link>{" "}
                {t("legal.conjunction")}{" "}
                <Link href="#" className="text-primary text-sm">
                  {t("legal.links.privacyPolicy")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />

        <AnimatedBlob />
      </div>
    </div>
  )
}

export default LoginPage

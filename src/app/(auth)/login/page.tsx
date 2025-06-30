"use client"

import React, { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Github, Loader2, Lock, Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import ThemeToggle from "@/components/shared/theme-toggle"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { LoginType, loginSchema } from "@/validations/user.validation"

function LoginPage() {
  const t = useTranslations("app.auth.login")

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "zotaeus@gmail.com",
      password: "123As@"
    }
  })

  const onSubmit = async (data: LoginType) => {
    try {
      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.message("Login successful!", {
        description: "Login data: " + JSON.stringify(data, null, 2)
      })
      console.log("Login data:", data)
    } catch (error) {
      toast.message("Login failed. Please try again.", {
        description: "Login error: " + error
      })
      console.log("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2 text-center">
                  <div className="bg-primary/10 mx-auto flex size-12 cursor-pointer items-center justify-center rounded-full">
                    <Lock size={24} color="var(--primary)" className="opacity-70" />
                  </div>

                  <h3 className="text-foreground mt-2 text-2xl font-bold">{t("title")}</h3>

                  <p className="text-muted-foreground px-4 text-sm text-balance">
                    {t("description")}
                  </p>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.fields.email.label")}</FormLabel>

                        <FormControl>
                          <div className="relative">
                            <Mail
                              size={16}
                              color="var(--primary)"
                              className="absolute top-1/2 left-3 -translate-y-1/2 opacity-70"
                            />

                            <Input
                              type="email"
                              placeholder={t("form.fields.email.placeholder")}
                              className="h-11 pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.fields.password.label")}</FormLabel>

                        <FormControl>
                          <div className="relative">
                            <Lock
                              size={16}
                              color="var(--primary)"
                              className="absolute top-1/2 left-3 -translate-y-1/2 opacity-70"
                            />

                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder={t("form.fields.password.placeholder")}
                              className="h-11 px-10"
                              {...field}
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute top-1/2 right-3 -translate-y-1/2"
                            >
                              {showPassword ? (
                                <EyeOff size={16} color="#fff" />
                              ) : (
                                <Eye size={16} color="var(--primary)" className="opacity-70" />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end text-sm">
                    <Link href="#" className="text-primary">
                      {t("form.actions.forgotPassword")}
                    </Link>
                  </div>

                  <Button type="submit" disabled={isLoading} className="h-10 w-full font-semibold">
                    {isLoading ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        {t("form.actions.submitLoading")}
                      </>
                    ) : (
                      t("form.actions.submit")
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="border-border/50 w-full border-t" />
                    </div>

                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card text-muted-foreground px-3 font-medium">
                        {t("social.divider")}
                      </span>
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full font-semibold">
                    <Github size={16} />
                    {t("social.providers.github")}
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-muted-foreground text-sm">
                    {t("form.links.noAccount")}{" "}
                  </span>

                  <Link href="#" className="text-primary text-sm font-medium">
                    {t("form.links.signUp")}
                  </Link>
                </div>
              </form>
            </Form>

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

        <Image
          src="/images/hoan-hao.jpg"
          alt="Moncial Login Background"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage

import { cookies } from "next/headers"

import { getRequestConfig } from "next-intl/server"

export const locales = ["en", "vi", "zh", "ja", "ko", "fr", "es", "de"] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value

  let locale: Locale = "en"

  if (localeCookie && locales.includes(localeCookie as Locale)) {
    locale = localeCookie as Locale
  }

  try {
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  } catch (error) {
    console.warn(`Messages for locale "${locale}" not found, falling back to English.`)
    return {
      locale: "en",
      messages: (await import(`../../messages/en.json`)).default
    }
  }
})

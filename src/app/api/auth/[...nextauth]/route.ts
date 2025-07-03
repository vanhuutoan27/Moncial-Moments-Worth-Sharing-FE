import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    })
  ],

  pages: {
    signIn: "/login"
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpires = account.expires_at
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.accessTokenExpires = token.accessTokenExpires

      return session
    }
  },

  events: {
    async signIn(message) {
      if (typeof window !== "undefined" && message.account?.access_token) {
        localStorage.setItem("accessToken", message.account.access_token)
        localStorage.setItem("refreshToken", message.account.refresh_token ?? "")
        localStorage.setItem(
          "accessTokenExpires",
          message.account.expires_at !== undefined ? message.account.expires_at.toString() : ""
        )
      }
    },

    async signOut() {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessTokenExpires")
      }
    }
  },

  debug: process.env.NODE_ENV === "development"
})

export { handler as GET, handler as POST }

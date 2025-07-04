import axios from "axios"

const monAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

monAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Request:", config.method?.toUpperCase(), config.url)
    }

    return config
  },
  (error) => {
    console.error("❌ Request Error:", error)
    return Promise.reject(error)
  }
)

monAPI.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Response:", response.status, response.config.url)
    }

    return response
  },
  async (error) => {
    console.error("❌ Response Error:", error)

    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken")

      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }

    if (error.response?.status === 403) {
      console.warn("🚫 Access denied")
    }

    if (error.response?.status >= 500) {
      console.error("🔥 Server error:", error.response.status)
    }

    return Promise.reject(error)
  }
)

export default monAPI

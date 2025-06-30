import { getCloudinaryUrl } from "@/config/cloudinary.config"

export const APP = {
  NAME: "Moncial",
  DESCRIPTION: "A social media platform for sharing moments and connecting with friends.",
  VERSION: "1.0.0"
}

export const ZOTAEUS = {
  id: "u1",
  fullName: "Zotaeus",
  username: "zotaeus",
  avatarUrl: getCloudinaryUrl(
    "v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg",
    "avatar"
  )
}

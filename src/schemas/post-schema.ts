import { z } from "zod"

import { PrivacyEnum } from "@/constants/enum/privacy"

import { fullTimestampFields, uuidSchema } from "./base-schema"

export const imagesPostSchema = z.object({
  url: z.string(),
  altText: z.string().optional()
})

const postSchema = z.object({
  id: uuidSchema,
  authorId: uuidSchema,

  content: z.string().nonempty({ message: "Content cannot be empty" }),
  location: z.string().nonempty({ message: "Location cannot be empty" }),
  images: z.array(imagesPostSchema),
  privacy: z.enum([PrivacyEnum.PUBLIC, PrivacyEnum.PRIVATE, PrivacyEnum.FOLLOWERS_ONLY]),
  hashtags: z.array(z.string()),

  likesCount: z.number().min(0, { message: "Likes count cannot be less than 0" }),
  commentsCount: z.number().min(0, { message: "Comments count cannot be less than 0" }),
  bookmarksCount: z.number().min(0, { message: "Bookmarks count cannot be less than 0" }),

  ...fullTimestampFields
})

export type PostType = z.infer<typeof postSchema>

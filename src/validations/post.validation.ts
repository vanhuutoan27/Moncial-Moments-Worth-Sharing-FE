import { z } from "zod"

import { Privacy } from "@/constants/enums/privacy"

import { uuidSchema } from "./common.validation"
import { authorSchema } from "./user.validation"

export const postMediaSchema = z.object({
  url: z.string().url({ message: "Image URL must be a valid URL" }),
  altText: z.string().max(255, { message: "Alt text must not exceed 255 characters." }).optional()
})

const postSchema = z.object({
  id: uuidSchema,
  authorId: uuidSchema,

  author: authorSchema((key: string) => key),

  caption: z.string().max(2000, { message: "Caption cannot exceed 2000 characters." }).optional(),
  location: z.string().max(100, { message: "Location must not exceed 100 characters" }).optional(),

  images: z
    .array(postMediaSchema)
    .max(10, { message: "Cannot upload more than 10 images per post." })
    .optional(),

  privacy: z.nativeEnum(Privacy, {
    message: "Privacy setting must be Public, Private, or Followers Only."
  }),

  hashtags: z
    .array(
      z
        .string()
        .min(3, { message: "Hashtag must be at least 3 characters long." })
        .max(50, { message: "Hashtag cannot exceed 50 characters." })
    )
    .max(20, { message: "Cannot add more than 20 hashtags per post." })
    .optional(),

  likesCount: z.number().int().min(0).default(0),
  commentsCount: z.number().int().min(0).default(0),
  sharesCount: z.number().int().min(0).default(0),
  bookmarksCount: z.number().int().min(0).default(0),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const createPostSchema = postSchema.pick({
  authorId: true,
  caption: true,
  location: true,
  images: true,
  privacy: true,
  hashtags: true
})

export const updatePostSchema = postSchema
  .pick({
    caption: true,
    images: true,
    hashtags: true
  })
  .partial()

export const updatePostCaptionSchema = postSchema.pick({
  caption: true
})

export const updatePostLocationSchema = postSchema.pick({
  location: true
})

export const updatePostPrivacySchema = postSchema.pick({
  privacy: true
})

export type PostMediaType = z.infer<typeof postMediaSchema>

export type PostType = z.infer<typeof postSchema>
export type CreatePostType = z.infer<typeof createPostSchema>
export type UpdatePostType = z.infer<typeof updatePostSchema>
export type UpdatePostCaptionType = z.infer<typeof updatePostCaptionSchema>
export type UpdatePostLocationType = z.infer<typeof updatePostLocationSchema>
export type UpdatePostPrivacyType = z.infer<typeof updatePostPrivacySchema>

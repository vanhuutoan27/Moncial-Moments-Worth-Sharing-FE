import { z } from "zod"

import { uuidSchema } from "./base-schema"

const hashtagSchema = z.object({
  id: uuidSchema,

  name: z
    .string()
    .min(3, { message: "Hashtag must be at least 3 characters long." })
    .max(50, { message: "Hashtag cannot exceed 50 characters." }),

  postsCount: z.number().int().min(0).default(0),

  createdAt: z.string().datetime()
})

export const postHashtagSchema = hashtagSchema.pick({
  name: true
})

export type HashtagType = z.infer<typeof hashtagSchema>

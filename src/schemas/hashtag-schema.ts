import { z } from "zod"

import { creationTimestampFields, uuidSchema } from "./base-schema"

const hashtagSchema = z.object({
  id: uuidSchema,

  name: z.string().nonempty({ message: "Content cannot be empty" }),
  postsCount: z.number().min(0, { message: "Posts count cannot be less than 0" }),

  ...creationTimestampFields
})

export const createHashtagSchema = hashtagSchema.pick({
  name: true
})

export type HashtagType = z.infer<typeof hashtagSchema>
export type CreateHashtagType = z.infer<typeof createHashtagSchema>

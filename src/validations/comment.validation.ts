import { z } from "zod"

import { uuidSchema } from "./base.validation"
import { authorSchema } from "./user.validation"

const commentSchema = z.object({
  id: uuidSchema,
  authorId: uuidSchema,
  postId: uuidSchema,

  author: authorSchema,

  content: z.string().max(1000, { message: "Comment cannot exceed 1000 characters." }),

  isEdited: z.boolean().default(false),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const createCommentSchema = commentSchema.pick({
  authorId: true,
  postId: true,
  content: true
})

export const updateCommentSchema = commentSchema
  .pick({
    content: true
  })
  .partial()

export type CommentType = z.infer<typeof commentSchema>
export type CreateCommentType = z.infer<typeof createCommentSchema>
export type UpdateCommentType = z.infer<typeof updateCommentSchema>

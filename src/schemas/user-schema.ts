import { z } from "zod"

import { fullTimestampFields, uuidSchema } from "./base-schema"

export const userSchema = z.object({
  id: uuidSchema,

  fullName: z
    .string()
    .nonempty({ message: "Full name cannot be empty" })
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(255, { message: "Full name cannot be longer than 255 characters" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Full name can only contain letters and spaces"
    }),
  username: z
    .string()
    .nonempty({ message: "Username cannot be empty" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username cannot be longer than 255 characters" })
    .regex(/^[\p{L} ]+$/u, {
      message: "Username can only contain letters and spaces"
    }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().regex(/^(0\d{9}|(\+84)\d{9})$/, {
    message: "Phone number must have 10 digits and start with 0 or +84"
  }),

  bio: z.string().optional(),
  avatarUrl: z.string().optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(128, { message: "Password cannot be longer than 128 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character"
    }),

  isPrivate: z.boolean(),
  isActive: z.boolean(),

  ...fullTimestampFields
})

export type UserType = z.infer<typeof userSchema>

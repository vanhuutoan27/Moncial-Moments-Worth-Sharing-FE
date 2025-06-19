import { z } from "zod"

import { uuidSchema } from "./base-schema"

export const userSchema = z.object({
  id: uuidSchema,

  email: z
    .string({ required_error: "Email is required." })
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Must be a valid email address." }),
  phoneNumber: z
    .string({ required_error: "Phone number is required." })
    .min(1, { message: "Phone number cannot be empty." })
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(11, { message: "Phone number cannot exceed 11 digits." })
    .regex(/^0[3|5|7|8|9][0-9]{8}$/, {
      message: "Must be a valid Vietnamese phone number starting with 03, 05, 07, 08, or 09."
    }),
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(1, { message: "Full name cannot be empty." })
    .min(3, { message: "Full name must be at least 3 characters." })
    .max(255, { message: "Full name cannot exceed 255 characters." })
    .regex(/^[\p{L}\s]+$/u, {
      message: "Full name can only contain letters and spaces."
    }),
  username: z
    .string({ required_error: "Username is required." })
    .min(1, { message: "Username cannot be empty." })
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores."
    }),

  bio: z.string().max(255, { message: "Bio cannot exceed 255 characters." }).optional(),
  avatarUrl: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal("")),

  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(128, { message: "Password cannot exceed 128 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." }),

  isPrivate: z.boolean().default(false),
  isActive: z.boolean().default(true),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const authorSchema = userSchema.pick({
  id: true,
  fullName: true,
  username: true,
  avatarUrl: true
})

export type UserType = z.infer<typeof userSchema>

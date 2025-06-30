import { TranslationValues } from "next-intl"
import { z } from "zod"

import { uuidSchema } from "./base.validation"

export const userSchema = (t: (key: string, values?: TranslationValues) => string) => {
  return z.object({
    id: uuidSchema,

    email: z
      .string({ required_error: t("form.fields.email.validations.required") })
      .min(1, { message: t("form.fields.email.validations.required") })
      .email({ message: t("form.fields.email.validations.invalid") }),
    phoneNumber: z
      .string({ required_error: "Phone number is required." })
      .min(1, { message: "Phone number is required." })
      .min(10, { message: "Phone number must be at least 10 digits." })
      .max(11, { message: "Phone number cannot exceed 11 digits." })
      .regex(/^0[3|5|7|8|9][0-9]{8}$/, {
        message: "Must be a valid Vietnamese phone number starting with 03, 05, 07, 08, or 09."
      }),
    fullName: z
      .string({ required_error: "Full name is required." })
      .min(1, { message: "Full name is required." })
      .min(3, { message: "Full name must be at least 3 characters." })
      .max(255, { message: "Full name cannot exceed 255 characters." })
      .regex(/^[\p{L}\s]+$/u, {
        message: "Full name can only contain letters and spaces."
      }),
    username: z
      .string({ required_error: "Username is required." })
      .min(1, { message: "Username is required." })
      .min(3, { message: "Username must be at least 3 characters." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores."
      }),

    bio: z.string().max(255, { message: "Bio cannot exceed 255 characters." }).optional(),
    avatarUrl: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal("")),

    password: z
      .string({ required_error: t("form.fields.password.validations.required") })
      .min(6, { message: t("form.fields.password.validations.constraints.min") })
      .max(32, { message: t("form.fields.password.validations.constraints.max") })
      .regex(/[A-Z]/, { message: t("form.fields.password.validations.requirements.uppercase") })
      .regex(/[a-z]/, { message: t("form.fields.password.validations.requirements.lowercase") })
      .regex(/\d/, { message: t("form.fields.password.validations.requirements.number") })
      .regex(/[\W_]/, { message: t("form.fields.password.validations.requirements.special") }),

    isPrivate: z.boolean().default(false),
    isActive: z.boolean().default(true),

    followersCount: z.number().int().min(0).default(0),
    followingCount: z.number().int().min(0).default(0),
    postsCount: z.number().int().min(0).default(0),
    likesCount: z.number().int().min(0).default(0),
    commentsCount: z.number().int().min(0).default(0),
    sharesCount: z.number().int().min(0).default(0),
    bookmarksCount: z.number().int().min(0).default(0),

    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
}

export const authorSchema = (t: (key: string, values?: TranslationValues) => string) =>
  userSchema(t).pick({
    id: true,
    fullName: true,
    username: true,
    avatarUrl: true
  })

export const loginSchema = (t: (key: string, values?: TranslationValues) => string) =>
  userSchema(t).pick({
    email: true,
    password: true
  })

export type UserType = z.infer<ReturnType<typeof userSchema>>
export type AuthorType = z.infer<ReturnType<typeof authorSchema>>

export type LoginType = z.infer<ReturnType<typeof loginSchema>>

import { z } from "zod"

export const uuidSchema = z.string().uuid({ message: "ID invalid" })

export const creationTimestampFields = {
  createdAt: z.string()
}

export const fullTimestampFields = {
  createdAt: z.string(),
  updatedAt: z.string()
}

export const auditFields = {
  ...fullTimestampFields,
  createdBy: z.string(),
  updatedBy: z.string()
}

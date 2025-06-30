import { z } from "zod"

export const uuidSchema = z.string().uuid({ message: "Must be a valid UUID format." })

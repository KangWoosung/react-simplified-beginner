import { z } from "zod";

export const FormDataSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required. 필요해요")
    .min(4, { message: "Title must be at least 4 characters." }),
  body: z
    .string()
    .nonempty("Body is required.")
    .min(6, { message: "Body must be at least 6 characters." }),
  userId: z.number().int().min(0, "Value must be a positive number"),
});

// Example..
const Account = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(18).max(80),
  level: z.enum(["GOLD", "SILVER", "BRONZE"]),
  image: z.string().url().max(200).optional(),
  ips: z.string().ip().array().optional(),
  active: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
});

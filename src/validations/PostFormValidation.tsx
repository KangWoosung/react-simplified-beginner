/* 2023-10-02 16:06:05


*/
import React from "react";
import { z } from "zod";

export const PostFormValidation = z.object({
  title: z
    .string()
    .nonempty("Title is required. 필요해요")
    .min(4, { message: "Title must be at least 4 characters." }),
  body: z
    .string()
    .nonempty("Body is required.")
    .min(6, { message: "Body must be at least 6 characters." }),
  userId: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n > 0, { message: "Value must be a positive number" }),
});

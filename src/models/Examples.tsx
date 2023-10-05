import React from "react";
import { z } from "zod";

// some examples..
const mySchema = z.string();

// parsing
mySchema.parse("hello"); // => "hello"
mySchema.parse(123); // => throws Error('Invalid input')
mySchema.parse(null); // => throws Error('Invalid input')
mySchema.safeParse(12); // => { success: false, error: ZodError }

// coerce
const coerceSchema = z.coerce.string();
coerceSchema.parse(123); // => "123"
coerceSchema.parse(null); // => ""

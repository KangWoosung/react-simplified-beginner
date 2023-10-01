/* 2023-10-01 14:50:33
Zod 의 Html input -> number -> min() max() 문제는 생각보다 난이도가 있는 문제였고,
같은 문제로 고생한 사람들의 흔적을 찾을 수 있었다. 
StackOverflow 어느 고수의 해결 코드를 사용해서 문제를 해결하였다.
https://stackoverflow.com/questions/71052832/zod-set-min-max-after-transform-string-to-number

어려운 문제였던 만큼, 커밋하고 넘어가기로 하자. 
Commit: Zod-set-min-max-after-transform-string-to-number
*/

import { z } from "zod";

let errerMsg;
export const FormDataSchema = z.object({
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
  // 개고생의 흔적...
  // .number()
  // .min(0, "Value must be a positive number")
  // .string()
  // .transform((str) => {
  //   parseInt(str, 10);
  //   if (isNaN(str)) {
  //     throw new Error("Value must be an integer");
  //   } else if (str < 1) {
  //     throw new Error("Value must be a positive number");
  //   }
  // })
  // .catch((e) => {
  //   return { message: e };
  // }),
  // .transform(parseIntValidator()),
  //  preprocess sugestion from StackOverflow
  //  https://stackoverflow.com/questions/71052832/zod-set-min-max-after-transform-string-to-number
  // .preprocess((input) => {
  //   const processed = z
  //     .string()
  //     .regex(/^\d+$/)
  //     .transform(Number)
  //     .safeParse(input);
  //   return processed.success ? processed.data : input;
  // }, z.number().min(0, { message: "Value must be a positive number" })),
});

// Html 의 모든 입력값은 디폴트로 string 이다
// 정수값을 검사해야 할 때, Html 입력 밸류가 다이렉트로 Zod 에게 직진하는 상황에서,
// Zod 가 넘버형을 validate 하려면, 문제가 발생할 수 밖에 없다.
// 사용자 정의 펑션을 z 밸리데이션에서 호출함으로 이 문제를 우회한다.
// function parseIntValidator() {
//   return (value) => {
//     const intValue = parseInt(value, 10);
//     if (isNaN(intValue)) {
//       throw new Error("Value must be an integer");
//     } else if (intValue < 1) {
//       throw new Error("Value must be a positive number");
//     }
//     return intValue;
//   };
// }

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

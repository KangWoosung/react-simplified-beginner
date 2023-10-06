/* 2023-10-05 23:23:52


*/

import { z } from "zod";

export const TodoSchema = z.object({
  userId: z.coerce.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

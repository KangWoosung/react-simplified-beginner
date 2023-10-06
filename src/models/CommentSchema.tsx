/* 2023-10-05 19:53:09

*/

import { z } from "zod";

export const CommentSchema = z.object({
  postId: z.coerce.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

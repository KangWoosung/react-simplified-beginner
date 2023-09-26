/* 2023-09-25 20:04:07
Zod Validation 을 도입해본다.

*/

import { z } from "zod";

const EditPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  userId: z.string(),
});

const validateEditPost = (data) => {
  try {
    EditPostSchema.parse(data);
    return null;
  } catch (error) {
    return error.message;
  }
};

const action = async ({ params, request }) => {
  const formData = await request.formData();
  const formDataObject = {
    id: formData.get("id"),
    title: formData.get("title"),
    body: formData.get("body"),
    userId: formData.get("userId"),
  };

  const validationError = validateEditPost(formDataObject);

  if (validationError) {
    return validationError; // 유효성 검사 오류 반환
  }

  const postId = formDataObject.id;
  console.log("formDataObject", formDataObject);

  const editData = await updatePost(formDataObject, {});
  return redirect(`../${postId}`);
};

/* 2023-09-25 20:04:07
Zod Validation 을 도입해본다.

2023-09-26 19:14:33
너무 어렵다. 일단은 useState 로 숙제를 마무리하고 나서, 라이브러리 혼용은 내일 다시 생각해보자. 

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
*/

import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { getPost } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { useEffect, useRef } from "react";

function EditPost782() {
  const { post, users } = useLoaderData();
  const { state } = useNavigation();
  const titleRef = useRef();
  const authorRef = useRef();
  const bodyRef = useRef();
  const submittingState = state === "submitting";

  useEffect(() => {
    titleRef.current.value = post.title;
    bodyRef.current.value = post.body;
    authorRef.current.value = post.userId;
  }, []);

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="post" action={`/posts/${post.id}/edit`} className="form">
        <input type="hidden" name="id" value={post.id} />
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" ref={titleRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" ref={authorRef}>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" ref={bodyRef}></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts/2">
            Cancel
          </a>
          <button disabled={submittingState} className="btn">
            Save
          </button>
        </div>
      </Form>
    </>
  );
}

const loader = async ({ params, request: { signal, url } }) => {
  const post = await getPost(params.postId, { signal });
  const users = await getUsers({ signal });
  return { post, users };
};

const action = () => {};

export const EditPostRoute = {
  element: <EditPost782 />,
  loader,
  action,
};

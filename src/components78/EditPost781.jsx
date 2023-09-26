/* 2023-09-24 13:07:38

    PUT /posts/:id - Update a post
*/

import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { getPost, updatePost } from "../apiHandler/posts";
import { useEffect, useRef } from "react";
import { getUsers } from "../apiHandler/users";

function EditPost781() {
  const { post, users } = useLoaderData();
  const { state } = useNavigation();
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const submittingState = state === "submitting";
  console.log(post);

  useEffect(() => {
    titleRef.current.value = post.title;
    authorRef.current.value = post.userId;
    bodyRef.current.value = post.body;
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

const loader = async ({ params, request: { signal } }) => {
  console.log("params", params.postId);

  const post = await getPost(params.postId, { signal });
  const users = await getUsers({ signal });
  return { post, users };
};

//  PUT /posts/:id - Update a post
const action = async ({ params, request }) => {
  const formData = await request.formData();
  console.log("formData.get('title')", formData.get("title"));
  if (formData.get("title") == "" || formData.get("body") == "")
    return "Title & Body required";

  const postId = formData.get("id");
  const formDataObject = {
    id: formData.get("id"),
    title: formData.get("title"),
    body: formData.get("body"),
    userId: formData.get("userId"),
  };
  console.log("formDataObject", formDataObject);
  const editData = await updatePost(formDataObject, {});
  return redirect(`../${postId}`);
};

export const EditPostRoute = {
  element: <EditPost781 />,
  loader,
  action,
};

/* 2023-09-29 18:31:16

*/

import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

function EditPost783() {
  const { post, users } = useLoaderData();
  const { state } = useNavigate();
  const navigate = useNavigate();
  const formRef = useRef();
  const titleRef = useRef();
  const usersRef = useRef();
  const bodyRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submittingState = state === "submitting";
  console.log("post", post);

  const onSubmit = () => {
    const form = formRef.current;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    updatePost(formDataObject, {});
    navigate(`/posts/${post.id}`);
  };

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="form"
      >
        <input type="hidden" name="id" value={post.id} />
        <div className="form-row">
          <FormGroup errorMessage={errors?.title?.message}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              ref={titleRef}
              {...register("title", {
                required: true,
                validate: (value) => {
                  if (!value.endsWith("..")) {
                    return "Must end with ..";
                  } else {
                    console.log("Validating triggered.. with, ", value);
                  }
                },
              })}
              defaultValue={post.title}
            />
          </FormGroup>
          <FormGroup errorMessage={errors?.userId?.message}>
            <label htmlFor="userId">Author</label>
            <select
              ref={usersRef}
              {...register("userId", { required: true })}
              defaultValue={post.userId}
            >
              <option value={0} key={0}>
                Nobody
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormGroup>
        </div>
        <div className="form-row">
          <FormGroup errorMessage={errors?.body?.message}>
            <label htmlFor="body">Body</label>
            <textarea
              ref={bodyRef}
              {...register("body", {
                required: true,
                validate: (value) => {
                  if (!value.endsWith("....")) {
                    return "Must end with ....";
                  } else {
                    console.log("Validating triggered.. with, ", value);
                  }
                },
              })}
              defaultValue={post.body}
            ></textarea>
          </FormGroup>
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

async function loader({ params, request: { url, signal } }) {
  const post = await getPost(params.postId, { signal });
  const users = await getUsers({ signal });
  return { post, users };
}

export const EditPostRoute = {
  element: <EditPost783 />,
  loader,
};

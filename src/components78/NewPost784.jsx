/* 2023-09-29 20:02:22

Zod 라이브러리를 도입하자. 

- error.message 까지 schema 에서 관리되니까.. register 구문에서 error 처리 코드를 빼주는게 맞을 듯..
- 이게 전부인가??

2023-09-29 22:40:19
스키마는 작성했고... 
이식해서 작동하는지 테스트 해보면 되겠다. 
TS 코드 부분이 오류난다... 문제가 좀 커질 듯... 
내일 처리하자. 
*/

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormDataSchema } from "../schemas/formDataSchema";

import { useLoaderData, useNavigate } from "react-router";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";

function NewPost784() {
  const { users, maxId } = useLoaderData();
  const nextId = maxId + 1;
  const { state } = useNavigate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm < Inputs > { resolver: zodResolver(FormDataSchema) };

  const formRef = useRef();
  const submittingState = state === "submitting";

  const onSubmit = () => {
    const form = formRef.current;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    const newData = addPost(formDataObject, {});
    // newPost.id is missing.. so we need to generate next id
    navigate(`/posts/${nextId}`);
  };

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="form"
        ref={formRef}
      >
        <div className="form-row">
          <FormGroup errorMessage={errors?.title?.message}>
            <label htmlFor="title">Title in 783...</label>
            <input type="text" {...register("title")} />
          </FormGroup>

          <FormGroup errorMessage={errors?.userId?.message}>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" {...register("userId")}>
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
            <textarea name="body" {...register("body")}></textarea>
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="/posts">
            Cancel
          </Link>
          <button disabled={submittingState} className="btn">
            Save
          </button>
        </div>
      </Form>
    </>
  );
}

const loader = async ({ request: { signal } }) => {
  const users = await getUsers({ signal });
  const posts = await getPosts({ signal });
  const maxId = Math.max(...posts.map((post) => post.id));
  return { users, maxId };
};

export const NewPostRoute = {
  element: <NewPost784 />,
  loader,
};

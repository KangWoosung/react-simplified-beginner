/* 2023-09-29 12:14:42
이번 버전에서는, 
  1. RRD + RHF 로 구현,
까지만 해보자.

784 버전에서,
  2. Zod 라이브러리 도입
그리고 다음 버전에서, React-Query 를 추가해보자. 
그리고 그 다음 버전에서, Todos 의 CRUD 를, RRD+RHF+Zod+RQ 모두 충동원, 마스터링 하고 끝내자. 

2023-09-29 17:55:46
RRD+RHF 로 폼 밸리데이션 처리 OK,
RRD+RHF 액션 처리와 액션 후 리다이렉션 처리 OK,
Json-Server 가 되돌려주는 데이터 오브젝트에 post.id 가 빠져있다.
실전처럼, 다음 posts.id 를 state useMemo 로 확보해놓고 있다가, redirection 파라메터로 넣어주자.
최종 id 를 확보하는 방법.. 
끗
*/

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { addPost, getPosts } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";

function NewPost783() {
  const { users, maxId } = useLoaderData();
  const nextId = maxId + 1;
  const { state } = useNavigate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef();
  const submittingState = state === "submitting";

  const onSubmit = async (data) => {
    console.log("data", data);
    const form = formRef.current;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    // newPost.id is missing.. so we need to generate next id
    const newPost = await addPost(formDataObject, {});
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
            <input
              type="text"
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
            />
          </FormGroup>

          <FormGroup errorMessage={errors?.userId?.message}>
            <label htmlFor="userId">Author</label>
            <select
              name="userId"
              id="userId"
              {...register("userId", {
                required: true,
                validate: (value) => {
                  if (value < 1) {
                    return "Must be a valid Person";
                  } else {
                    console.log("Validating triggered.. with, ", value);
                  }
                },
              })}
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
              name="body"
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
            ></textarea>
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

const loader = async ({ params, request: { signal, url } }) => {
  const users = await getUsers({ signal });
  const posts = await getPosts({ signal });
  const maxId = await findMaxId(posts);
  return { users, maxId };
};

const action = async () => {
  //  action 에서 처리될 코드들을 모두 onSubmit 으로 옮겨줬다.
  //  RRD+RHF 의 융합을 위해 RRD.action 은 disabled 해준 것..
  return null;
};
function findMaxId(arrayOfObjects) {
  if (arrayOfObjects.length === 0) {
    return null;
  }
  return arrayOfObjects.reduce(
    (maxId, obj) => (obj.id > maxId ? obj.id : maxId),
    arrayOfObjects[0].id
  );
}

export const NewPostRoute = {
  element: <NewPost783 />,
  loader,
};

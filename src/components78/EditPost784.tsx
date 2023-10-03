/* 2023-10-02 11:55:08

Type Management Global Ruleset 이 필요할 것 같다. 

Type 와 Zod 를 같이 쓰려면 더욱 복잡해질것 같다. 

*/
/*  modules import  */
import React, { useRef } from "react";
import { z } from "zod";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getPost, getPosts, updatePost } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/********************    Types Start    ************************/
/*  Types import  */
import { PostsType } from "../types/PostTypes";
import { PostType } from "../types/PostTypes";
import { UserType, UsersType } from "../types/UserTypes";
import { LoaderType } from "../types/AppTypes";
import { LoaderFuncType } from "../types/AppTypes";

/*  Zod Validations import  */
import { PostFormValidation } from "../validations/PostFormValidation";
import { UserWithGeo } from "../validations/UsersJsonSchema";
import { UserSchemaWithGeo } from "../validations/UsersJsonSchema";

const UserResults = z.array(UserSchemaWithGeo);
type UserArray = z.infer<typeof UserResults>;

/*  infer type from Zod schema  */
// type Inputs = z.infer<typeof PostFormValidation>;
type Inputs = {
  title: string;
  userId: number;
  body: string;
};
/*  Route Type actually exported  */
// 2023-10-02 21:09:46
// 아무래도, 문제가 여기서 시작되고 있는 것 같다.
// loader: (params: { request: { signal } }) 이렇게 잘못 작성되어 있었다.
// 수정하고 일단 여기 오류는 해결됨. 2023-10-02 21:15:55
interface EditPostRouteType {
  element: JSX.Element;
  loader: ({ params, request: { signal } }) => Promise<LoaderType>;
}
/********************    Types End    ************************/

interface LoaderDataTypeTemp {
  users: UsersType[];
  post: PostType;
}

function EditPost784() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as {
    state: string;
  };
  const submittingState = state === "submitting";

  const { users }: UserArray = useLoaderData() as UserWithGeo;
  //   const data = useLoaderData() as Awaited<ReturnType<typeof LoaderDataTypeTemp>>
  //   const data = useLoaderData() as LoaderDataTypeTemp;
  //   const { users, post } = data;
  //   const data = useLoaderData() as LoaderDataTypeTemp;
  //   const { users, post }: LoaderDataTypeTemp = data;
  // 이렇게 한 줄로 써주면 에러가 난다. 한참 삽질했고, 두 줄로 되돌렸더니 에러가 사라졌다.
  //   const { users, post }: LoaderDataTypeTemp = useLoaderData();
  console.log("users: ", users);
  console.log("post: ", post);
  console.log("post.id: ", post.id);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(PostFormValidation),
  });

  const onSubmitForm = async (data: Inputs): Promise<void> => {
    const formR = formRef.current as HTMLFormElement;
    const formData = new FormData(formR);
    const formDataObject = Object.fromEntries(formData);
    await updatePost(formDataObject, {});
    // navigate(`/posts/${post.id}`);
  };

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
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
            <select {...register("userId")}>
              <option value={0} key={0}>
                Nobody
              </option>
              {users.map((user) => {
                console.log("user", user);
                return (
                  <option value={Number(user.id)} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </FormGroup>
        </div>
        <div className="form-row">
          <FormGroup errorMessage={errors?.body?.message}>
            <label htmlFor="body">Body</label>
            <textarea {...register("body")}></textarea>
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="/posts">
            Cancel
          </Link>
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </>
  );
}

const loader = async ({
  params,
  request: { signal },
}): Promise<UserArray | undefined> => {
  const post = await getPost(params.postId, { signal });
  const users = await getUsers({ signal });
  //   console.log(users);
  //   console.log(post);
  return { users };
};

// 2023-10-02 21:06:37
// 아무래도, loader 의 타입에서 문제가 시작되고 있는 것 같다.
export const EditPostRoute: EditPostRouteType = {
  element: <EditPost784 />,
  loader,
};

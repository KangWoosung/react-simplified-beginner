/* 2023-10-02 11:55:08

Type Management Global Ruleset 이 필요할 것 같다. 
Type 와 Zod 를 같이 쓰려면 더욱 복잡해질것 같다. 

2023-10-03 21:43:54
loader 와 useLoaderData 관련, Type 문제를 아직도 해결하지 못하고 있다.
비슷한 문서를 몇개 찾았지만, 아직 어렵고 해결이 요원하다. 
https://stackoverflow.com/questions/74160709/how-can-i-define-the-return-type-for-a-react-router-v6-loader
https://github.com/remix-run/react-router/discussions/9792

*/
/*  modules import  */
import React, { useRef } from "react";
import { z } from "zod";
import {
  LoaderFunction,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import { Link } from "react-router-dom";
import { getPost, getPosts, updatePost } from "../apiHandler/posts";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/********************    Types Start    ************************/
/*  Zod models import  */
import { PostSchema } from "../models/PostSchema";
import { UserSchemaWithGeo } from "../models/UsersJsonSchema";

const UserResults = z.array(UserSchemaWithGeo);
type UserArrayType = z.infer<typeof UserResults>;

const PostResults = PostSchema;
type PostType = z.infer<typeof PostResults>;

// loader 펑션 타입

interface LoaderType {
  users: UserArrayType;
  // posts?: PostType[];
  post: PostType;
  // maxId?: number;
}
/********************    Types End    ************************/

interface loaderInterface {
  users: UserArrayType | undefined;
  post: PostType | undefined;
}

function EditPost784() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  // const { state } = useLocation() as unknown as {
  //   state: string;
  // };
  // useLocation 의 반환 타입은 unknown
  const location = useLocation();
  const state = location.state as string;
  const submittingState = state === "submitting";

  const { users, post }: loaderInterface = useLoaderData() as loaderInterface;
  // if (post && post.id) console.log("post.id: ", post.id);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>({
    resolver: zodResolver(PostSchema),
  });

  const onSubmitForm = async (data: PostType): Promise<void> => {
    const formR = formRef.current as HTMLFormElement;
    const formData = new FormData(formR);
    let formDataObject = Object.fromEntries(formData);
    if (post?.id !== undefined) {
      formDataObject = { ...formDataObject, id: post.id.toString() };
      console.log("formDataObject", formDataObject);
      await updatePost(formDataObject, {});
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        method="post"
        className="form"
        ref={formRef}
      >
        {/* <input type="hidden" {...register("id")} defaultValue={post?.id} /> */}
        <div className="form-row">
          <FormGroup errorMessage={errors?.title?.message}>
            <label htmlFor="title">Edit in 784... Post {post?.id}</label>
            <input
              type="text"
              {...register("title")}
              defaultValue={post?.title}
            />
          </FormGroup>

          <FormGroup errorMessage={errors?.userId?.message}>
            <label htmlFor="userId">Author</label>
            <select {...register("userId")} defaultValue={post?.userId}>
              <option value={0} key={0}>
                Nobody
              </option>
              {users &&
                users.map((user) => {
                  // console.log("user", user);
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
            <textarea
              id="body"
              {...register("body")}
              defaultValue={post?.body}
            ></textarea>
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
}): Promise<loaderInterface | undefined> => {
  const post = await getPost(params.postId, { signal });
  const users = await getUsers({ signal });
  return { users, post };
};

// 2023-10-02 21:06:37
// 아무래도, loader 의 타입에서 문제가 시작되고 있는 것 같다.
export const EditPostRoute = {
  element: <EditPost784 />,
  loader,
};

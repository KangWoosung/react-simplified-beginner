/* 2023-10-07 15:17:15

*/
import React, { useRef } from "react";
import { z } from "zod";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import {
  addPost,
  getPosts,
  getPostsByFilter,
  updatePost,
} from "../../apiHandler/posts";
import { getUsers } from "../../apiHandler/users";
import { Form, Link } from "react-router-dom";
import { FormGroup } from "./FormGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/*************** import Zod Schemas */
import { PostSchema } from "../../models/PostSchema";
import { UserSchemaWithGeo } from "../../models/UsersJsonSchema";
/*************** End Zod Schemas */

type PostSchema = z.infer<typeof PostSchema>;

const UserResults = z.array(UserSchemaWithGeo);
type UserArrayType = z.infer<typeof UserResults>;

type PostFormType = {
  users: UserArrayType;
  post?: PostSchema;
  version: string;
  nextId?: number;
  submittingState?: boolean;
};

export default function PostForm({
  users,
  post,
  version,
  nextId,
  submittingState,
}: PostFormType) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchema>({ resolver: zodResolver(PostSchema) });
  const navigate = useNavigate();

  const onSubmit = async (data: PostSchema): Promise<void> => {
    const form = formRef.current;
    const formData = new FormData(form as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData);

    if (post?.id !== undefined) {
      formDataObject.id = post.id.toString();
      await updatePost(formDataObject, {});
      navigate(`/posts/${post.id}`);
    } else {
      const newData = await addPost(formDataObject, {});
      newData?.id === "undefined" ? "" : (nextId = newData.id);
      navigate(`/posts/${nextId}`);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="form"
        ref={formRef}
      >
        <div className="form-row">
          <FormGroup errorMessage={errors?.title?.message}>
            <label htmlFor="title">Title in {version}...</label>
            <input
              type="text"
              {...register("title")}
              defaultValue={post?.title || ""}
            />
          </FormGroup>

          <FormGroup errorMessage={errors?.userId?.message}>
            <label htmlFor="userId">Author</label>
            <select {...register("userId")} defaultValue={post?.userId || ""}>
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
              {...register("body")}
              defaultValue={post?.body || ""}
            ></textarea>
          </FormGroup>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="/posts">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn"
            {...(submittingState && { disabled: true })}
          >
            {submittingState === true ? "Saving..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

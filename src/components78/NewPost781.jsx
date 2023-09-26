/* 2023-09-24 11:26:16

1. Create a New Post page that renders out a form that allows the user to create a new post. 
  Don't forget to add a button to the Posts page linking to the New Post page. The form should have the following fields:
    Title
    Body
    Author (User)

2. Disable the submit button on the New Post and Edit Post pages if the form is in the process of submitting.
3. Handle the following validations on the New Post and Edit Post pages:
    Title is required
    Body is required
    User is required

The API has the following new endpoints:
    POST /posts - Create a new post
    PUT /posts/:id - Update a post
    GET /posts?q=<query>&userId=<userId> - Returns all of the posts that match the query and userId

React-Router-Dom 과 React-Hook-Form 을 같이 사용하려고 해. 
폼 밸리데이션 에서만 React-Hook-Form 이 역할해주고
폼의 submit 은 React-Router-Dom 이 처리해주도록 하고싶어. 
그런데, 아래의 Form 컴포넌트 코드는,
React-Hook-Form 의 onSubmit 펑션에서 멈추고, React-Router-Dom 의 Action 으로 넘어가지 않고 있어. 
어떻게 고치면 React-Router-Dom 의 Action 으로 넘겨줄 수 있을까?
  <Form
    onSubmit={handleSubmit(onSubmit)}
    method="post"
    action="/posts/new"
    className="form"
  >

2023-09-24 17:12:06
onSubmit={handleSubmit(onSubmit)} 
이 라인만 지우고 간단히 해결됐다. 
React-Hook-Form 의 register 와 에러관리 기능만 뽑아서 사용하면 되는 것이었다. 
<Form /> 컴포넌트는 React-router-dom 에서 알아서 관리해준다. 
좋네...
숙제가 모두 끝났다. 
이제 버전을 바꿔서 다양한 라이브러리와 변형을 시도해보자. 반복이 근육을 만들어준다. 
*/

import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getUsers } from "../apiHandler/users";
import { addPost } from "../apiHandler/posts";
import { useForm } from "react-hook-form";
import { useRef } from "react";

function NewPost781() {
  const { users } = useLoaderData();
  const { state } = useNavigation();
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submittingState = state === "submitting";
  console.log("users", users);

  const onSubmit = (data) => {
    console.log("data", data);
    // formRef.current.submit();
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
          <div className={`form-group ${errors.title && "error"}`}>
            <label htmlFor="title">Title</label>
            <input type="text" {...register("title", { required: true })} />
            {errors.title && <div className="error-message">Required</div>}
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className={`form-group ${errors.body && "error"}`}>
            <label htmlFor="body">Body</label>
            <textarea {...register("body", { required: true })}></textarea>
            {errors.body && <div className="error-message">Required</div>}
          </div>
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
  return { users };
};

const action = async ({ request }) => {
  const formData = await request.formData();
  if (formData.title == "" || formData.body == "")
    return "Title & Body required";

  const formDataObject = {
    title: formData.get("title"),
    body: formData.get("body"),
    userId: formData.get("userId"),
  };

  const newPost = await addPost(formDataObject, {});
  return redirect("..");
};

export const NewPostRoute = {
  element: <NewPost781 />,
  loader,
  action,
};

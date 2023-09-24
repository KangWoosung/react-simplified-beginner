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
*/

import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getUsers } from "../apiHandler/users";
import { addPost } from "../apiHandler/posts";

function NewPost781() {
  const { users } = useLoaderData();
  const { state } = useNavigation();
  const submittingState = state === "submitting";
  console.log("users", users);

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">Required</div>
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
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
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

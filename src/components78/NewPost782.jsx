/* 2023-09-26 11:08:24

먼저, react-hook-form 을 도입해보자. 
2023-09-26 11:54:07
기존의 폼 밸리데이션이 작동하지 않아서, 781 버전으로 롤백해서 테스트 해봤더니, 781 버전에서도 역시 작동하지 않고 있었다. 뭔가 잘못 됐거나 착각 했거나... 
Form 요소에 onSubmit={handleSubmit(onSubmit)} 을 추가하고, onSubmit 펑션을 추가해줬더니, validation 이 작동했다. ...register 의 유효성 검사는 handleSubmit() 이 트리거 되어야만 작동하는 것인 것 같다. 
781 에서 handleSubmit() 을 열어줬을 때, action 코드가 작동하는지 확인해보자. 
작동하지 않는다. 

2023-09-26 16:08:20
되지 않는 일에 진을 너무 뺏겨버렸다. RRD 의 action 을 인위 트리거 하는 데에까지 갔다가, request 로 뭘 전달해줘야 할지 몰라서, 너무 나간 듯 하여 포기하고 롤백 하였다. 
RHF 는, handleSubmit 없이는 register 기능을 사용할 수 없다. 
2023-09-26 16:33:03
register 에, onChange, onBlur 등 이벤트에서 실시간 검사를 시도했지만, 성공할 수 없었다. 검사를 한다한들, 검사결과를 RHF 이 관리하는 State 에 반영할 방법은 없었다.
누군가는 RHF 와 RRD 을 사이좋게 영역 나눠줘서 사용한다고는 하는데, 내가 하루종일 삽질한 뒤 내린 결론은 ...
RHF 와 RRD 을 한 집에서 함께 사용하는 것은 불가능하다... 인 듯.. 

지금의 내 기술과 지식으로, 실시간 폼 밸리데이션은.. 
useState 로 커스텀 훅을 짜는 것..

2023-09-26 18:00:36
잠시 useState, useEffect 로 커스텀훅을 시도해봤는데, 이건 너무 비효율적이다. 검색을 해도 커스텀 훅이 보이질 않는건, 역시 라이브러리를 사용하는 게 너무도 효율적이기 때문이겠지..
스킵하고, Zod 라이브러리 사용으로 방향을 바꾼다. 

2023-09-26 18:41:36
Zod 는 더 복잡하다. 젠장...

2023-09-26 18:56:03
useState 를 덕지덕지 붙여서 해결은 했다. 
이제 useState 코드를 커스텀 훅으로 분리해보자. 

*/

import { useState, useEffect, useRef } from "react";
import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { getUsers } from "../apiHandler/users";
import { addPost } from "../apiHandler/posts";

function NewPost782() {
  const { users } = useLoaderData();
  const { state } = useNavigation();
  const titleRef = useRef();
  const bodyRef = useRef();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const submittingState = state === "submitting";

  const validateTitle = (e) => {
    const titleVal = e.target.value;
    setTitle(titleVal);
    titleVal.length < 4
      ? setTitleError("Title must be at least 4 characters")
      : setTitleError("");
  };
  const validateBody = (e) => {
    const bodyVal = e.target.value;
    setBody(bodyVal);
    bodyVal.length < 4
      ? setBodyError("Body must be at least 4 characters")
      : setBodyError("");
  };

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <div className={`form-group ${titleError && "error"}`}>
            <label htmlFor="title">Title in...</label>
            <input
              type="text"
              name="title"
              ref={titleRef}
              value={title}
              onChange={validateTitle}
            />
            {titleError && <div className="error-message">{titleError}</div>}
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
          <div className={`form-group ${bodyError && "error"}`}>
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              ref={bodyRef}
              value={body}
              onChange={validateBody}
            ></textarea>
            {bodyError && <div className="error-message">{bodyError}</div>}
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

  // const form = event.currentTarget
  // const formData = new FormData(form)
  // const formDataObject = Object.fromEntries(formData)

  const newPost = await addPost(formDataObject, {});
  return redirect("..");
};

export const NewPostRoute = {
  element: <NewPost782 />,
  loader,
  action,
};

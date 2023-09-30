/* 2023-09-30 01:17:38

2023-09-30 14:45:44
첫 TypeScript ..  비록 GPT 가 던져준 원형을 수정하고 디버깅한 것이지만,
적지 않은 걸 배운 것 같다. 
Jsx 를 Tsx 로 그대로 가져오면, Type Error 가 엄청나게 쏟아지는데,
이 에러들을 에러 발생지점에서 해결하려고 타입을 추가하다보면 일이 훨씬 어렵고 복잡해진다. 
Type Error 가 발생한 데이터의 원형까지 추적하고, 해당 데이터에게 잘 알아먹을 interface 들을 구성해준다면 모든 문제가 간단하게 해결된다. 

2023-09-30 17:03:59
모듈을 임포트하여 작동에 성공하였다. 

2023-09-30 18:41:12
이제 Zod 를 작동시켜야 하는데..
구조가 좀 많이 헤깔린다. 
스키마, 인터페이스의 구조와, 데이터가 전달되고 밸리데이팅 되는 플로우를 먼저 잘 정리해놓고 시작하자. 

2023-09-30 20:25:56
Zod 의 에러 메시지는 잘 출력이 되고 있다. 그렇긴 한데, Zod 의 규칙이 잘 적용되고 있지는 않은 것 같다. 
1커밋은 해야하니까.. 일단 "Zod is working.. but" 으로 커밋하고, 이후에 다시 해결해보자.
*/

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormDataSchema } from "../schemas/formDataSchema";

import { useLoaderData, useNavigate } from "react-router";
import { getUsers } from "../apiHandler/users";
import { FormGroup } from "./component/FormGroup";
import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { addPost } from "../apiHandler/posts";

const Account = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(18).max(80),
  level: z.enum(["GOLD", "SILVER", "BRONZE"]),
  image: z.string().url().max(200).optional(),
  ips: z.string().ip().array().optional(),
  active: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
});
// ✅ 스키마로 부터 타입 추론.. z.infer<typeof Account>
type Account = z.infer<typeof Account>;

// 이 두개의 interface 로 마법을 만들었다.
// 이 사용법은 정말로 잘 기억해둬야 할 것이다.
// 2023-09-30 19:55:17
// 이 interface 들은 RHF, Zod 와 직접연관이 없다.
// useLoaderData 로부터 전달받는 데이터 오브젝트를, 이후의 jsx 코드에서 타입을 인식할 수 있도록 추가되는 인터페이스이다.
interface LoaderData {
  users: UserType[];
  maxId: number;
}
interface UserType {
  id: number;
  name: string;
}

// 2023-09-30 19:57:52
// RHF 에서 폼 입력 필드를 실시간 감시하고 간섭하기 위한 interface 이다.
// 실제 에러 메세지는 FormDataSchema 에서 정의된 에러 메시지가 출력되는데
// 이게 왜 꼭 필요한 건지는 모르겠지만, 빠지면 타입스크립트 에러가 난다.
type Inputs = {
  title: string;
  userId: number;
  body: string;
};

export default function NewPost784() {
  // Type 단언...
  // useLoaderData() 의 리턴 데이터의 구조에 확신이 있다면 Type 단언으로 논란을 잠재우자.
  const data = useLoaderData() as LoaderData;
  // 분해 문법에서는 컬리괄호 바깥에서 타입을 지정해줘야 한다.
  const { users, maxId }: LoaderData = data;
  const nextId = maxId + 1;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) });
  // 이 한 줄의 코드가 많이 혼란스러웠는데,
  // <Inputs> 는 useForm 에 전달되는 약식 스키마로,
  // 이 스키마에 기준하여, 사용자 입력 밸류의 유효성을 검증하고 실시간 반영해주는 용도이다.
  // FormDataSchema 는 Zod 오브젝트 스키마로, 데이터 유효성과 규칙을 정의하는 데 사용된다.
  // 이 때, 에러 메세지는, Zod 오브젝트에서 지정해준 메세지를 RHF 에서 받아와 출력해줄 수 있다.

  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = async (data: Inputs) => {
    const form = formRef.current;
    const formData = new FormData(form as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData);
    const newData = await addPost(formDataObject, {});
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
            <select {...register("userId")}>
              <option value={Number(0)} key={0}>
                Nobody
              </option>
              {users.map((user) => (
                <option value={Number(user.id)} key={user.id}>
                  {user.name}
                </option>
              ))}
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
      </Form>
    </>
  );
}

const loader = async ({ request: { signal } }) => {
  const users = await getUsers({ signal });
  const maxId = Math.max(...users.map((user) => user.id));
  return { users, maxId };
};

export const NewPostRoute = {
  element: <NewPost784 />,
  loader,
};

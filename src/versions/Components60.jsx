import React from "react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

/*  2023-09-06 23:13:23
Form React 라이브러리 중, Kyle 이 소개하고 추천하는 라이브러리인 react-hook-form 의 사용법을 알아본다.
2023-09-06 23:35:31
감이 잘 안오네...
*/

const Components60 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

  return (
    <div>
      <h1>Components60</h1>
      <h2>React Hook Form</h2>
      <p></p>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Components60;

import { SignInFormGroup } from "./components/SignInFormGroup";
import { useForm, useController } from "react-hook-form";
import ReactSelect from "react-select";
import { motion } from "framer-motion";
import "../css/styles.css";

/*  2023-09-08 01:43:54
실전에서도 사용될 수 있을, Sign in form 을 만들어보자.
React Form Hook, Raeact Select 를 활용한다.

frame-motion 사용예제
  return (
    <motion.div
      className="box"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotateZ: 360 }}
    />
  );
*/

const EMAIL_PROVIDERS = [
  { label: "Gmail", value: "gmail.com" },
  { label: "Naver", value: "naver.com" },
  { label: "Daum", value: "daum.net" },
];

const SignInForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  //   useController 의 정확한 용도와 용법은 몰라도,
  //   ReactSelect 를 사용하려면, useController 가 필요하다.
  //   ReactSelect 의 onChange 에 바인딩해서 form.data 에 selected.value 가 추가되도록
  //   코드를 짤 수도 있지만, useController 를 사용하면 좀 더 간편해진다.
  //   useController 가 사용되는 구문을 외우고 익숙해지자.
  //   register 가 사용되는 input 에서는 필요 없지만, ReactSelect 에서는 필수다.
  //  const { newWine : carvenet } = { origin: "France", price: "100euro", newWine: "nope" }
  //  console.log(carvenet) // nope
  const { field: emailProviderField } = useController({
    name: "emailProvider",
    control,
    rules: { required: { value: true, message: "Required" } },
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(emailProviderField);
  };

  return (
    <motion.div className="box" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <h1>SignInForm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <SignInFormGroup errorMessage={errors?.email?.message}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "Required" },
              validate: (value) => {
                if (!value.endsWith("@gmail.com")) {
                  return "Must end with @gmail.com";
                }
              },
            })}
          />
        </SignInFormGroup>
        <SignInFormGroup errorMessage={errors?.emailProveder?.message}>
          <ReactSelect
            isClearable
            classNamePrefix={"react-select"}
            id="emailProvider"
            options={EMAIL_PROVIDERS}
            {...emailProviderField}
          />
          {/* <ReactSelect
    isClearable
    classNamePrefix={"react-select"}
    id="emailProvider"
    options={EMAIL_PROVIDERS}
    onChange={(selectedOption) => {
        // 여기에서 선택한 옵션을 처리합니다.
        const selectedValue = selectedOption ? selectedOption.value : null;
        // selectedValue를 필요한 곳에서 handleSubmit 함수에 전달할 수 있습니다.
    }}
/> */}
        </SignInFormGroup>

        <SignInFormGroup errorMessage={errors?.password?.message}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: { value: true, message: "Required" },
              minLength: { value: 8, message: "Must be at least 8 characters" },
              validate: (value) => {
                if (!/\d/.test(value)) {
                  return "Must contain a number";
                }
              },
            })}
          />
        </SignInFormGroup>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default SignInForm;

// const { newWine : carvenet } = { origin: "France", price: "100euro", newWine: "nope" }
// console.log(carvenet) // nope

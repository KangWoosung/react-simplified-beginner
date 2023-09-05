import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/styles58.css";

/*  2023-09-05 22:46:15
useRef 와 useState 를 조합한, 실시간 Form Validator
4번 문제에 도전... 

0. validator 를 비롯한, 펑션 코드는 그대로 쓰고,
1. useRef 버전과 useState 버전의 분기를 가름할 수 있는 state[diversion] 를 추가해주자. 
2. 디폴트 diversion=="useRef" 이면, 
    validateEmail 과 validatePasswd 에서는, 그냥 return 만 해주면 된다.
    그리고, handleSubmit 에서, 에러상태가 발생하면, diversion 을 "useState" 로 바꿔주자.
3. 이후, diversion=="useState" 로 바뀌면,
    validateEmail 과 validatePasswd 에서, 58.1 의 코드 그대로 진행시키면 될 듯..

2023-09-05 23:39:15
새롭게 등장한 스프레드 문법이 빌런이 됐지만, 하지만, 세워둔 로직 대로 해결했네.
로직이 문제지, 숙제는 어렵지 않았다. 물론 스프레드 구문은 또다른 숙제가 됐지만...
*/

const Components582 = () => {
  const emailRef = useRef();
  const passwdRef = useRef();
  const [emailVal, setEmailVal] = useState("");
  const [passwdVal, setPasswdVal] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwdValid, setPasswdValid] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwdErrorMsg, setPasswdErrorMsg] = useState("");
  const [diversion, setDiversion] = useState("useRef");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailVal = emailRef.current.value;
    const passwdVal = passwdRef.current.value;
    const emailPatt = /gmail.com$/i;
    const passwdPatt = /[0-9]+/i;
    if (emailVal.length < 1) {
      setEmailValid(false);
      setEmailErrorMsg("Cannot be blank");
    } else if (!emailVal.match(emailPatt)) {
      setEmailValid(false);
      setEmailErrorMsg("Must end in @webdevsimplified.com");
    } else if (emailVal.match(emailPatt)) {
      setEmailValid(true);
    }
    if (passwdVal.length < 10) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must be 10 characters or longer");
    } else if (!passwdVal.match(/[a-z]+/i)) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must include lowercase letters");
    } else if (!passwdVal.match(/[A-Z]+/i)) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must include upperCase letters");
    } else if (!passwdVal.match(passwdPatt)) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must include a number");
    } else if (passwdVal.match(passwdPatt)) {
      setPasswdValid(true);
    }

    emailValid && passwdValid
      ? setDiversion("useRef")
      : (setDiversion("useState"),
        setEmailVal(emailVal),
        setPasswdVal(passwdVal));
  };
  console.log("emailValid: ", emailValid);

  const validateEmail = (e) => {
    if (diversion == "useRef") return;

    const emailPatt = /gmail.com$/i;
    const currentInput = e.target.value;
    setEmailVal(currentInput);
    // console.log("Validating email form..", currentInput.length);
    // console.log("emailErrorMsg: ", emailErrorMsg);

    if (currentInput.length < 4) {
      setEmailValid(false);
      setEmailErrorMsg("Cannot be blank");
    } else if (!currentInput.match(/\@/)) {
      setEmailValid(false);
      setEmailErrorMsg("Must include @");
    } else if (!currentInput.match(emailPatt)) {
      setEmailValid(false);
      setEmailErrorMsg("Must end in @gmail.com");
    } else {
      setEmailValid(true);
    }
  };
  const validatePasswd = (e) => {
    if (diversion == "useRef") return;

    const passwdPatt = /[0-9]+/i;
    const currentInput = e.target.value;
    setPasswdVal(currentInput);

    if (currentInput.length < 10) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must be 10 characters or longer");
    } else if (!currentInput.match(/[a-z]+/i)) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must include lowercase letters");
    } else if (!currentInput.match(/[A-Z]+/i)) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must include upperCase letters");
    } else if (!currentInput.match(passwdPatt)) {
      setPasswdValid(false);
      setPasswdErrorMsg("Must include a number");
    } else if (currentInput.match(passwdPatt)) {
      setPasswdValid(true);
    }
  };

  return (
    <>
      <h1>Components582</h1>
      <h2>Form Validation</h2>
      <p>
        {`
4. Make it so that the error messages show up when you submit the form (just like step 2), but also make it so the error messages will automatically update when you change the value in each input but only after the first time you submit the form.
For example if you type in an email that is incorrect and submit the form it should show an error message. Then when you go back and start making changes to the email input, the error message should update with the current errors as you change the input and disappear when the input is valid.

4번 문제에 도전한다.
useRef 방식으로 첫 서밋이 발생한 다음부터는, useState 방식으로 작동하도록 만들으라고...
`}
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className={`form-group ${emailValid ? "" : "error"}`}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            {...(diversion === "useRef"
              ? { ref: emailRef }
              : { value: emailVal })}
            onChange={validateEmail}
          />
          <div className="msg">
            {emailValid ? "Valid email though" : emailErrorMsg}
          </div>
        </div>
        <div className={`form-group ${passwdValid ? "" : "error"}`}>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="text"
            id="password"
            {...(diversion === "useRef"
              ? { ref: passwdRef }
              : { value: passwdVal })}
            // ref={passwdRef}
            // value={passwdVal}
            onChange={validatePasswd}
          />
          <div className="msg">
            {passwdValid ? "Nice Password bro." : passwdErrorMsg}
          </div>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Components582;

/*
Hi Kyle.
Thank you for your great course.
So far I'm still here alive. That's the best part for me. ;)
My approach of this work was somewhat different from yours, so I want to ask you about the problems with my implementation.
My code works just fine. But I'm not sure my kind of approach is the proper "React Way" you mentioned several times.

  const emailRef = useRef();
  const [diversion, setDiversion] = useState("useRef");

  const handleSubmit = (e) => {
    e.preventDefault();
    emailValid && passwdValid
      ? setDiversion("useRef")
      : (setDiversion("useState"),
        setEmailVal(emailVal),
        setPasswdVal(passwdVal));
    // Do something...
  };

  const validateEmail = (e) => {
    if (diversion == "useRef") return;
    setEmailVal(e.target.value);
    // Check codes...
  };

  return(
  <form onSubmit={handleSubmit} className="form">
    <input
        className="input"
        type="email"
        id="email"
        {...(diversion === "useRef"
        ? { ref: emailRef }
        : { value: emailVal })}
        onChange={validateEmail}
    />
    <div className="msg">
        {emailValid ? "Valid email though" : emailErrorMsg}
    </div>
  </form>
  )
*/

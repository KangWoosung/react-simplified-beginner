import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/styles58.css";

/*  2023-09-04 21:01:45
useState 버전의 form validator app 코드
input state 를 실시간 감시하면서 유효성 검사와 결과를 출력해준다. 

2023-09-05 22:41:32
1, 2, 3 기본 문제는 모두 해결했다. 완벽하게 작동중... 
Custom Hook 을 만들면 좀 더 깔끔하겠지만.. 일단은 보류.. 
useEffect 없이 펑션으로만 받았는데, 적당한 생각일까? useEffect 가 들어가야 한다면 어떤 모습으로 바뀌어야 하는가?

일단 4번, 보너스 문제에 도전하자. 파일을 새로 만들어서..
*/

const Components581 = () => {
  const emailRef = useRef();
  const passwdRef = useRef();
  const [emailVal, setEmailVal] = useState("");
  const [passwdVal, setPasswdVal] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwdValid, setPasswdValid] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwdErrorMsg, setPasswdErrorMsg] = useState("");

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
  };
  console.log("emailValid: ", emailValid);

  const validateEmail = (e) => {
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
      <h1>Components581</h1>
      <h2>Form Validation</h2>
      <p>
        {`1. Create a form with an email and password input that check for the following  validations:
    Email:
        Required (Cannot be blank)
        Must end in @webdevsimplified.com
    Password:
        Required (Cannot be blank)
        Must Be 10 characters or longer
        Must include a lowercase letter
        Must include an uppercase letter
        Must include a number
2. Show error messages next to the inputs every time the form is submitted if there are any. If there are no errors alert the message Success.
3. If you did the first 2 steps using refs, repeat the same thing with state instead. If you used state for the first 2 steps instead repeat the same thing with refs.

4. Make it so that the error messages show up when you submit the form (just like step 2), but also make it so the error messages will automatically update when you change the value in each input but only after the first time you submit the form.
For example if you type in an email that is incorrect and submit the form it should show an error message. Then when you go back and start making changes to the email input, the error message should update with the current errors as you change the input and disappear when the input is valid.
와!! 이건 사악하네. 진짜 문제 사악하게 냈내ㅔ
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
            ref={emailRef}
            value={emailVal}
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
            ref={passwdRef}
            value={passwdVal}
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

export default Components581;

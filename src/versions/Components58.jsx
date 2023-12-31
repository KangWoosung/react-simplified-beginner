import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/styles58.css";

/*  2023-09-03 23:40:36
1. Create a form with an email and password input that check for the following  validations:
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

2023-09-04 03:06:43
패턴 검사를 대충 노가다로 했지만, 이거 제대로 해야하는 상황인지 모르겠다. 
암튼, 2번 까지 완료했다 치고, 내일 3번, useState 버전으로 작업하자. Components58.1.jsx 로, 컴포넌트를 별도로 만들어서 작업하자.
그리고 보너스 문제도 시도하고... 한 두세시간 걸릴 듯..
*/

const Components58 = () => {
  //   const [emailVal, setEmailVal] = useState("test@test.com");
  const [emailValid, setEmailValid] = useState(false);
  const [passwdValid, setPasswdValid] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwdErrorMsg, setPasswdErrorMsg] = useState("");

  const emailRef = useRef();
  const passwdRef = useRef();

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

  return (
    <>
      <h1>Components58</h1>
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
            // value={emailVal}
            // onChange={(e) => setEmailVal(e.target.value)}
          />
          <div className="msg">
            {emailValid ? "Valid email though" : emailErrorMsg}
          </div>
        </div>
        <div className={`form-group ${passwdValid ? "" : "error"}`}>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input className="input" type="text" id="password" ref={passwdRef} />
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

export default Components58;

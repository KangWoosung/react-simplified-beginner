import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/styles58.css";

/*  2023-09-05 22:46:15
useRef 와 useState 를 조합한, 실시간 Form Validator
4번 문제에 도전... 
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

export default Components582;

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [combinedName, setCombinedName] = useState();

  // User Login info
  const database = [
    {
      username: "user",
      password: "pass",
      // passwordBackwards: "pass", todo: could make the passwords backwards
    },
  ];

  const errors = {
    uname: "invalid username",
    consent: "must unselect checkbox",
    pass: `invalid password, your password is "${database[0].password}"`,
    passMismatch: "passwords don't match!",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass, consent, pass1, pass2 } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (consent.checked) {
      setErrorMessages({ name: "consent", message: errors.consent });
    } else if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else if (
        pass.value !== pass1.value ||
        pass.value !== pass2.value ||
        pass1.value !== pass2.value
      ) {
        setErrorMessages({ name: "pass2", message: errors.passMismatch });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // todo: could count down - Resetting form in 10 seconds!
  // const startTimer = (duration, display) => {
  //   var timer = duration,
  //     minutes,
  //     seconds;
  //   setInterval(function () {
  //     minutes = parseInt(timer / 60, 10);
  //     seconds = parseInt(timer % 60, 10);

  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;

  //     display.textContent = seconds;

  //     if (--timer < 0) {
  //       timer = duration;
  //     }
  //   }, 1000);
  // };

  // const startupTime = 10;
  // var display = document.querySelector("#time");
  // startTimer(startupTime, display);

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  let uname = "";

  const handleChange = (event) => {
    // console.log("event.target.value", event.target.value);
    // uname = uname.concat(event.target.value);

    uname = uname.concat(event.target.value);
    console.log("uname now", uname);
    let combinedName = uname;
    setCombinedName(combinedName);
  };

  // JSX code for login form
  const renderForm = (
    <div className="form changingForm">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          {/* todo: username field is disabled from typing */}
          {/* it gets filled out by selecting the radio buttons */}
          <input type="text" name="uname" value={combinedName} required />
          <p>Username: {uname}</p>
          <div>
            {[
              "a",
              "b",
              "c",
              "d",
              "e",
              "f",
              "g",
              "h",
              "i",
              "j",
              "k",
              "l",
              "m",
              "n",
              "o",
              "p",
              "q",
              "r",
              "s",
              "t",
              "u",
              "v",
              "w",
              "x",
              "y",
              "z",
            ].map((letter) => {
              return (
                <span key={`nameSpan-${letter}`}>
                  <input
                    type="radio"
                    name="uname1"
                    value={letter}
                    onChange={handleChange}
                  />
                  <label htmlFor="uname1">{letter}</label>
                </span>
              );
            })}
          </div>

          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="pass1" required />
        </div>
        <div className="input-container">
          <label>Confirm Password (Just In Case)</label>
          <input type="password" name="pass2" required />
        </div>
        {renderErrorMessage("pass2")}

        <div className="button-container">
          <input type="checkbox" name="consent" defaultChecked></input>
          <label htmlFor="consent">
            By unselecting this, I consent to login submission.
          </label>
          {renderErrorMessage("consent")}
        </div>

        <div className="button-container">
          <input type="checkbox" name="soul" defaultChecked></input>
          <label htmlFor="soul">
            I consent to selling all my data and soul to this application.
          </label>
        </div>

        <div className="button-container">
          <div>
            <input type="submit" />
          </div>
          <div>
            <input type="reset" />
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      {/* <div>
        Reloading in <span id="time">10</span> seconds!
      </div> */}
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <>
            <div>User is successfully logged in</div>
            {/* <div className="button-container">
              <input type="submit" value="Login Again" onClick={renderForm} />
            </div> */}
          </>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;

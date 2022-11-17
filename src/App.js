import React, { useState } from "react";

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user",
      password: "p@ss",
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

  const startTimer = (duration, display) => {
    var timer = duration,
      seconds;
    setInterval(function () {
      seconds = parseInt(timer % 60, 10);

      display.textContent = seconds;

      if (--timer < 0) {
        timer = duration;

        let countdown = document.querySelector("#countdown");
        let countdownSize = countdown.style["font-size"];
        console.log("countdownSize", countdownSize);
        if (!countdownSize) {
          countdown.style["font-size"] = "70px";
        } else {
          countdown.style["font-size"] =
            countdownSize.substring(0, countdownSize.indexOf("p")) * 1.1 + "px";
        }

        let form = document.forms[0];
        form.uname.value = "";
        form.pass.value = "";
        form.pass1.value = "";
        form.pass2.value = "";
        form.consent.checked = true;

        let width = form.style.width;
        if (!width) {
          form.style.width = "750px";
        } else {
          form.style.width =
            width.substring(0, width.indexOf("p")) * 0.8 + "px";
        }
      }
    }, 1000);
  };

  const timerStart = 30;
  window.onload = function () {
    let display = document.querySelector("#time");
    startTimer(timerStart, display);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  let uname = "";

  const handleChange = (event) => {
    let { uname } = document.forms[0];
    if (!uname.value) {
      uname.value = event.target.value;
    } else {
      uname.value = uname.value.concat(event.target.value);
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form changingForm">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" value={uname} required />
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
          <label>Confirm Password Again (Just In Case)</label>
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
      {!isSubmitted && (
        <div id="countdown">
          Resetting the form in <span id="time">{timerStart}</span> seconds
        </div>
      )}
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <>
            <div>User is successfully logged in</div>
          </>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;

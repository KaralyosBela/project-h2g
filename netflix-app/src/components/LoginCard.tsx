import React, { useState } from "react";
import classes from "./LoginCard.module.css";
import { useNavigate } from "react-router-dom";

export const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.currentTarget.value);
  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.currentTarget.value);

  const auth = (event: any) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/");
    }
  };

  return (
    <div className={classes.logincard}>
      <div className={classes.card}>
        <h1>LOG IN</h1>
        <form role="form" className={classes.inputs} onSubmit={auth}>
          <label htmlFor="username">USER ID*</label>
          <input
            data-testid="userIdInput"
            type="text"
            id="username"
            onChange={usernameOnChange}
          ></input>

          <label htmlFor="password">PASSWORD*</label>
          <input
            data-testid="passwordInput"
            type="password"
            id="password"
            onChange={passwordOnChange}
          ></input>

          <div className={classes.action}>
            <button className={classes.resetBtn}>RESET</button>
            <button
              className={classes.loginBtn}
              data-testid="loginBtn"
              type="submit"
            >
              LOG IN
            </button>
          </div>

          <p>*Mandatory</p>
        </form>
      </div>
    </div>
  );
};

import React, { Component, useState } from "react";
import { Link, useNavigate, withRouter } from "react-router-dom";
import axios from "axios";
import foodpyramidslides from "./pyramid2.png";
import "./loginForm.css";
import { Stack } from "@mui/system";

const LoginForm = (/** @type {{setToken,}}*/ props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleChange(event) { 
    const {value, name} = event.target
    setState(prevNote => ({
        ...prevNote, [name]: value})
    )}

  function handleSubmit(event) {
    axios({
      method: "POST",
      url: "/token",
      data: state,
      headers: {
        Authorization: `Bearer  ${props.token}`,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
        console.log("successfully logged in!");
        navigate("/home");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage("Wrong credentials, please try again!")
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    event.preventDefault();
  }

  return (
    <div className="Toggle">
      <div className="appAside">
        <div className="appForm">
          <div className="formCenter">
            <form className="formFields" onSubmit={handleSubmit}>
              <div className="title">Sign In</div>
              <div className="formField">
              {errorMessage && <div className="error"> {errorMessage} </div>}
                <label className="formFieldLabel" htmlFor="username">
                  Username
                </label>
                <input
                  color="white"
                  type="username"
                  id="username"
                  className="formFieldInput"
                  placeholder="Enter your username"
                  name="username"
                  value={state.username}
                  onChange={handleChange}
                  style={{ color: "white" }}
                />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                />
              </div>

              <Stack
                gap={1}
                direction={"row"}
                alignItems={"center"}
                className="formField"
              >
                <button className="formFieldButton" onClick={handleSubmit} >
                  Sign In
                </button>
                
                {""}
                <Link
                  to="/sign-up"
                  className="formFieldLink"
                  style={{ marginTop: "initial !important", cursor: "pointer" }}
                >
                  Create an account
                </Link>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

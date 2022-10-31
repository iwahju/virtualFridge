import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../feature/userSlice";
import "./Login.css";
import Error from "../error/Error";
import * as FaIcons from "react-icons/fa";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  //add password validation
  // const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const registerUser = async (data) => {
    const reponse = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await reponse.json();
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = await registerUser({ name, email, password });
    console.log(user);
    if (user) {
      dispatch(
        login({
          name: name,
          email: email,
          password: password,
          loggedIn: true,
        })
      );
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="login">
        <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
          <h1>Login here</h1>
          {error && <Error />}
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            icon={<FaIcons.FaBars />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit__btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

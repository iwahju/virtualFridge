import React, { useEffect, useState } from "react";
import "./App.css";
import MenuAppBar from "./components/appbar/Appbar";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { HashRouter as NavLink } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import SignupForm from "./components/login/SignupForm";
import Toggle from "./components/login/Toggle";
import Home from "./components/pages/Home";
import MyRecipe from "./components/pages/MyRecipe";
import { useSelector } from "react-redux";
import { selectUser } from "./components/feature/userSlice";
import useToken from "./components/login/useToken";

import Logout from "./components/logout/Logout";
import axios from "axios";
// import Userbutton from "./components/userbutton/Userbutton";

function App() {
  const user = useSelector(selectUser);
  const { token, removeToken, setToken } = useToken();
  
 

  useEffect(() => {
    console.log("token modified", { token });
    
  }, [token]);

  return (
    <div className="app">
      {" "}
      {user || true ? (
        <Router>
          {token && <MenuAppBar removeToken={removeToken} token={token} />}

          <Routes>
            <Route path="/" exact element={<LoginForm setToken={setToken} />} />
            <Route path="/sign-up" element={<SignupForm setToken={setToken}/>} />
            <Route
              path="/home"
              element={
                <Home token={token} setToken={setToken} />
              }
            />
            <Route
              path="/myrecipe"
              element={<MyRecipe token={token} setToken={setToken} />}
            />

            {/* <Route path='/myrecipe' components = {MyRecipe}/>
        <Route path='/myrecipe' components = {MyRecipe}/> */}
          </Routes>
        </Router>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;

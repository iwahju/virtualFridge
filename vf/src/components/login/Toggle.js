import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import "./toggle.css";

function Toggle() {
    return (
      <Router>
            <Route exact path="/sign-up" component={SignupForm} />
            <Route path="/" component={LoginForm} />
      </Router>
    );
  }


export default Toggle;




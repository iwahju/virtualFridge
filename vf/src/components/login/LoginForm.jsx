import React, {Component} from "react";
import {Link} from "react-router-dom";
import foodpyramidslides from "../login/pyramid2.png"


class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      <div className="Toggle" >
      <div className="appAside" >
      <div className= "appForm">
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className= "title">
            Sign In 
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{""}
            <Link to="/sign-up" className="formFieldLink">
              Create an account
            </Link>
          </div>
        </form>
      </div>
      </div>
      </div>
      </div>
      
    );
  }
}

export default LoginForm;


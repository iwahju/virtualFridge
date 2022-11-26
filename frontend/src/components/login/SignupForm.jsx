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
    password: ""
  });

  function handleChange(event) { 
    const {value, name} = event.target
    setState(prevNote => ({
        ...prevNote, [name]: value})
    )}

  function handleSubmit(event) {

    axios({
      method: "POST",
      url: "/createAccount",
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
              <div className="title">Sign Up</div>
              <div className="formField">
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
                <button className="formFieldButton" onClick={handleSubmit}>
                  Sign Up
                </button>
                {""}
                <Link
                  to="/"
                  className="formFieldLink"
                  style={{ marginTop: "initial !important", cursor: "pointer" }}
                >
                  Sign in
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






// import React, { Component } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// class SignupForm extends Component {
  
//   constructor() {
//     super();

//     this.state = {
//       username: "",
//       password: "",
//       hasAgreed: false
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     let target = event.target;
//     let value = target.type === "checkbox" ? target.checked : target.value;
//     let name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }

//   handleSubmit(e) {
//     axios({
//       method: "POST",
//       url: "/createAccount",
//       data: this.state,
//       headers: {
//         Authorization: `Bearer  ${this.props.token}`,
//       },
//     })
//       .then((response) => {
//         this.props.setToken(response.data.access_token); 
//         console.log("successfully logged in!");
//         this.props.navigation.navigate("/home")
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       });
      
//     e.preventDefault();
//   }

//   render() {
//     return (
//       <div className="Toggle" >
//       <div className="appAside" >
//       <div className= "appForm">
//       <div className="formCenter">
//         <form onSubmit={this.handleSubmit} className="formFields">
//           <div className="formField">
//           <div className= "title">
//             Sign Up
//           </div>
//           </div>
          
//           <div className="formField">
//             <label className="formFieldLabel" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="username"
//               id="username"
//               className="formFieldInput"
//               placeholder="Enter your username"
//               name="username"
//               value={this.state.username}
//               onChange={this.handleChange}
//             />
//           </div>

//           <div className="formField">
//             <label className="formFieldLabel" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="formFieldInput"
//               placeholder="Enter your password"
//               name="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//           </div>

          // <div className="formField">
          //   <label className="formFieldCheckboxLabel">
          //     <input
          //       className="formFieldCheckbox"
          //       type="checkbox"
          //       name="hasAgreed"
          //       value={this.state.hasAgreed}
          //       onChange={this.handleChange}
          //     />{" "}
          //     I agree all statements in{" "}
          //     <a href="null" className="formFieldTermsLink">
          //       terms of service
          //     </a>
          //   </label>
          // </div>

//           <div className="formField">
//             <button className="formFieldButton">Sign Up</button>{" "}
//             <Link to="/" className="formFieldLink">
//               I'm already member
//             </Link>
//           </div>
//         </form>
//       </div>
//       </div>
//       </div>
//       </div>
//     );
//   }
// }
// export default SignupForm;

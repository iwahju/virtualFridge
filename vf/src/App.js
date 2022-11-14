import React, { useState } from "react";
import "./App.css";
import MenuAppBar from "./components/appbar/Appbar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import { HashRouter as  NavLink } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import SignupForm from "./components/login/SignupForm";
import Toggle from "./components/login/Toggle";
import Home from "./components/pages/Home";
import MyRecipe from "./components/pages/MyRecipe";
import { useSelector } from "react-redux";
import { selectUser } from "./components/feature/userSlice";

import Logout from "./components/logout/Logout";
// import Userbutton from "./components/userbutton/Userbutton";
import { FridgeProvider } from "./context";

function App() {  
  const [fridgestate, setfridgestate] = useState({
    items: [],
  });

  const user = useSelector(selectUser);
  const updateFridge = (newItem) => {
    setfridgestate({
      ...fridgestate,
      items: [...fridgestate.items, newItem],
    });
  };
  return (
    
    
    <FridgeProvider
      value={{
        data: fridgestate,
        updateFridge,
      }}
    >
      <div className="app">
        {" "}
        {user || true ? ( 
          <Router>
            <MenuAppBar/>
            <Routes>
              <Route path="/" exact element={<LoginForm/>} />
              <Route path="/sign-up" element={<SignupForm/>} />  
              <Route path="/home"  element={<Home />} />
              <Route path="/myrecipe" element={<MyRecipe />} />
              
              {/* <Route path='/myrecipe' components = {MyRecipe}/>
        <Route path='/myrecipe' components = {MyRecipe}/> */}
            </Routes>
          </Router>
        ) : (
          <LoginForm/>
        )}
      </div>
     
    </FridgeProvider>
  );
}

export default App;

import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import MyRecipe from "./components/pages/MyRecipe";
import { useSelector } from "react-redux";
import { selectUser } from "./components/feature/userSlice";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
// import Userbutton from "./components/userbutton/Userbutton";



function App() { 
  const user = useSelector(selectUser);
  return (
    <>
    <div className="app"> {user || true  ? 
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact element = {<Home/>}/>
        <Route path='/myrecipe' element = {<MyRecipe/>}/>
        {/* <Route path='/myrecipe' components = {MyRecipe}/>
        <Route path='/myrecipe' components = {MyRecipe}/> */}
      </Routes>
    </Router>  
    : <Login/>}
    </div>
    </>
  );
};

export default App;
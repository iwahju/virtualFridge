import React, { useState } from "react";
import "./App.css";
import MenuAppBar from "./components/appbar/Appbar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import MyRecipe from "./components/pages/MyRecipe";
import { useSelector } from "react-redux";
import { selectUser } from "./components/feature/userSlice";
import Login from "./components/login/Login";
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
      <div className="background-image">
      <div className="app">
        {" "}
        {user ? (
          <Router>
            <MenuAppBar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/myrecipe" element={<MyRecipe />} />
              {/* <Route path='/myrecipe' components = {MyRecipe}/>
        <Route path='/myrecipe' components = {MyRecipe}/> */}
            </Routes>
          </Router>
        ) : (
          <Login />
        )}
      </div>
      </div>
    </FridgeProvider>
  );
}

export default App;
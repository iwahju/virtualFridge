import React, { useState, useContext } from "react";
import "./plusmenu.css";
import { fridgeContext } from "../../context";
import App from "../../App";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import Box from "@mui/material/Box";



function Plusmenu() {
  const [item, setItem] = useState("");
  const [quantity, setQuan] = useState("");
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");

  // function formatDate(date) {
  //   const currentMonth = date.getMonth();
  //   const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  //   const currentDate = date.getDate();
  //   const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  //   return `${date.getFullYear()}-${monthString}-${currentDate}`;
  // }
  const defaultformstate = {
    item:{
      ingredient: "",
      quantity: 0,
      date: new Date(),
      unit: "",
      location: "fridge",
    }
  };

  //regiter item into database 
  const addItem = async (data) => {
    data["email"] = "123@gmail.com";
    const reponse = await fetch("http://localhost:1337/api/addToFridge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await reponse.json();
    
    return result;
  };

  const [formstate, setFormstate] = useState(defaultformstate);
  const context = useContext(fridgeContext);
  console.log("this is context!!!!!!!!");
  console.log(context);
  const handleInputChange = (e) => {
    formstate.item[e.target.name] = e.target.value;
    setFormstate({
      ...formstate,
      [item]: formstate.item ,
    });
    console.log(formstate);
  };
  //location = fridge, pantry
  const handleFridgeClick = (location, e) => {
    e.preventDefault();
    setFormstate({
      ...formstate,
      location,
    });
    console.log(formstate);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formstate);
    addItem(formstate);
  };

  return (
    <div className="plusmenu-outer-container">
      <div className="plusmenu-inner-container">
        <div>
          <h3>Add Item</h3>
        </div>
        <div>
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="form-title">
              <input
                name="ingredient"
                value={formstate.item.ingredient}
                type="text"
                placeholder="Item Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-quan-date">
              <input
                name="quantity"
                value={formstate.item.quantity}
                type="text"
                placeholder="quantity"
                onChange={handleInputChange}
              />
              <input
                name="unit"
                value={formstate.item.unit}
                type="text"
                placeholder="unit"
                onChange={handleInputChange}
              />
              <input
                name= "date"
                value={formstate.item.date}
                type="date"
                placeholder="Exp. Date"
                onChange={handleInputChange}
              />
              
            </div>
            <div class="flex items-center justify-center">
              <div class="inline-flex" role="group">
                <button
                  type="button"
                  class="
                      rounded-l
                      px-6
                      py-2
                      border-2 border-red-600
                      text-red-600
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      hover:bg-black hover:bg-opacity-5
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                    "
                  onClick={(e) => handleFridgeClick("fridge", e)}
                >
                  Fridge
                </button>
                <button
                  type="button"
                  class="
                      px-6
                      py-2
                      border-t-2 border-b-2 border-blue-600
                      text-blue-600
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      hover:bg-black hover:bg-opacity-5
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                    "
                  onClick={(e) => handleFridgeClick("pantry", e)}
                >
                  Pantry
                </button>
              </div>
            </div>

            {/* <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    sx={{
                      "& .MuiDrawer-paper": {
                        backgroundColor: "#123D35",
                      },
                    }}
                    onClick={(e) => handleFridgeClick("fridge", e)}
                  >
                    Fridge
                  </Button>
                  <Button onClick={(e) => handleFridgeClick("pantry", e)}>
                    Pantry
                  </Button>
                </ButtonGroup> */}
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Plusmenu;

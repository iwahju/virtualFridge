import React, { useState, useContext } from "react";
import "./plusmenu.css";
import {fridgeContext} from "../../context"

function Plusmenu() {
  const defaultformstate = {
    name: "",
    quantity: 0,
    "exp-date": "",
    location: "fridge",
  };
  const [formstate, setFormstate] = useState(defaultformstate);
  const context = useContext(fridgeContext)
  console.log(context)
  const handleInputChange = (e) => {
    setFormstate({
      ...formstate,
      [e.target.name]: e.target.value,
    });
  };
  //location = fridge, pantry
  const handleFridgeClick = (location,e) => {
    e.preventDefault()
    setFormstate({
      ...formstate,
      location,
    });
    console.log(formstate);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formstate);
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
                name="name"
                value={formstate.name}
                type="text"
                placeholder="Item Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-quan-date">
              <input
                name="quantity"
                value={formstate.quantity}
                type="text"
                placeholder="quantity"
                onChange={handleInputChange}
              />
              <input
                name="exp-date"
                value={formstate["exp-date"]}
                type="text"
                placeholder="Exp. Date"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button onClick={(e) => handleFridgeClick("fridge",e)}>
                Fridge
              </button>
              <button onClick={(e) => handleFridgeClick("pantry",e)}>
                Pantry
              </button>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Plusmenu;

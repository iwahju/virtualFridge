import React, { useState, useContext } from "react";
import "./plusmenu.css";
import { fridgeContext } from "../../context";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function Plusmenu() {
  const defaultformstate = {
    name: "",
    quantity: 0,
    unit: "",
    date: "",
    location: "fridge",
  };
  const [formstate, setFormstate] = useState(defaultformstate);
  const context = useContext(fridgeContext);
  console.log(context);
  const handleInputChange = (e) => {
    setFormstate({
      ...formstate,
      [e.target.name]: e.target.value,
    });
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
                value={formstate.item.name}
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
                name="exp-date"
                value={formstate.item.date}
                type="text"
                placeholder="Exp. Date"
                onChange={handleInputChange}
              />
              
            </div>
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup
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
                </ButtonGroup>
              </Box>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Plusmenu;

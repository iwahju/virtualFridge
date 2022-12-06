import React, { useState, useContext, useRef } from "react";
import "./editmenu.css";
import { fridgeContext } from "../../context";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

function Editmenu(props) {

  const defaultformstate = {
      ingredient: props.data["ingredient"],
      quantity: props.data["quantity"],
      unit: props.data["unit"],
      date: props.data["date"],
      fridge: props.data["fridge"],
      index: props.data["index"]
  };
  const [unitSelectorOpen, setUnitSelectorOpen] = useState(false)
  const [formstate, setFormstate] = useState(defaultformstate);

  const context = useContext(fridgeContext);
  console.log(formstate);
  const handleInputChange = (e, closeSelector) => {
    if (closeSelector) {
      setUnitSelectorOpen(false)
    }
    setFormstate({
      ...formstate,
      [e.target.name]: e.target.value,
    });
    
  };
  //location = fridge, pantry
  const handleFridgeClick = (fridge, e) => {
    e.preventDefault();
    setFormstate({
      ...formstate,
      fridge,
    });
    console.log(formstate);
  };
  const handleFormSubmit = (e) => {
    console.log(props.token)
    axios({
      method: "POST",
      url: "/editItem",
      data: formstate,
      headers: {
        Authorization: `Bearer  ${props.token}`,
      },
    })
      .then((response) => {
        console.log(response)
        props.setProfileLoaded(false)
        props.setEditedIndex(-1)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    e.preventDefault();
    console.log(formstate);
  };

  return (
    <div className="plusmenu-outer-container">
      <div className="plusmenu-inner-container">
        <div>
        <div className= "additem-title">
          {formstate.ingredient}
          </div>
        </div>
        <div>
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="form-quan-date">
              <TextField
                sx={{width: 50}}
                id="standard-number"  label="Quantity" variant="standard" 
                color= "success" focused
                name="quantity"
                value={formstate.quantity}
                type="text"
                placeholder="'12'"
                onChange={handleInputChange}
              />


            <FormControl variant="standard" 
                      color= "success" focused
                      name= "unit"
                      sx={{ minWidth: 90 }}>
                    <InputLabel id="demo-simple-select-standard-label">Unit</InputLabel>
                    <Select
                      open={unitSelectorOpen}

                  sx={{color:"white", fontFamily:"Exo"}}
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={formstate.unit}
                      name= "unit"
                      onChange={(e) => {
                        
                        handleInputChange(e, true)
                       
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        setUnitSelectorOpen(!unitSelectorOpen)
                      }}
                      renderValue={() => {
                        return <span>{formstate.unit}</span>
                      }}
                      label="unit"
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <input type= "text" 
                      placeholder="other"
                      name= "unit"
                      onChange={handleInputChange}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onKeyDown={(e) => {
                        // console.log(e.code)
                        
                       
                      }}
                      />
                      <MenuItem value={"grams"}>grams</MenuItem>
                  <MenuItem value={"kilograms"}>kilograms</MenuItem>
                  <MenuItem value={"pounds"}>pounds</MenuItem>
                  <MenuItem value={"ounces"}>ounces</MenuItem>
                  <MenuItem value={"gallons"}>gallons</MenuItem>
                  <MenuItem value={"quarts"}>quarts</MenuItem>
                  <MenuItem value={"pints"}>pints</MenuItem>
                  <MenuItem value={"cups"}>cups</MenuItem>
                  <MenuItem value={"fluid ounces"}>fluid ounces</MenuItem>
                  <MenuItem value={"tablespoons"}>tablespoons</MenuItem>
                  <MenuItem value={"teaspoons"}>teaspoons</MenuItem>
                  <MenuItem value={"liters"}>liters</MenuItem>
                  <MenuItem value={"milliliters"}>milliliters</MenuItem>
                    </Select>
                  </FormControl>


              <TextField
               id="standard-number"  label="Expiration Date" variant="standard" 
               color= "success" focused
                name="date"
                value={formstate.date}
                type="date"
              
                placeholder="mm/dd/yy"
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
                  color="success"
                >
                  <Button
                    sx={{
                      "& .MuiDrawer-paper": {
                        backgroundColor: "#123D35",
                      },
                    }}
                    onClick={(e) => handleFridgeClick("true", e)}
                  >
                    Fridge
                  </Button>
                  
                  <Button onClick={(e) => handleFridgeClick("false", e)}>
                    Pantry
                  </Button>
                </ButtonGroup>
              </Box>
            </div>
            <div className= "add-buttoncontainer"> 
            <button className= "add-button" type="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editmenu;
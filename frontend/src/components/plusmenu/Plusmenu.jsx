import React, { useState, useContext, useRef } from "react";
import "./plusmenu.css";
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

function Plusmenu(props) {

  const defaultformstate = {
      ingredient: "",
      quantity: 0,
      unit: "",
      date: new Date(),
      fridge: "true"
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
      url: "/addItem",
      data: formstate,
      headers: {
        Authorization: `Bearer  ${props.token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
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
          Add Item
          </div>
        </div>
        <div>
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="form-title">
              <TextField
                sx={{width: 350}}
                color= "success" focused
                id="standard-basic" label="Item Name" variant="standard" 
                name="ingredient"
                value={formstate.ingredient}
                type="text"
                placeholder="'Eggs'"
                onChange={handleInputChange}
              />
            </div>
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
                        if (e.keyCode === 13) {
                          setUnitSelectorOpen(false)
                        }
                       
                      }}
                      />
                      <MenuItem value={'lbs'}>lbs</MenuItem>
                      <MenuItem value={'tsp'}>tsp</MenuItem>
                      <MenuItem value={'tbsp'}>tbsp</MenuItem>
                      <MenuItem value={'gallon'}>gallon</MenuItem>
                      <MenuItem value={'ounce'}>ounce(s)</MenuItem>
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
            <button className= "add-button" type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Plusmenu;
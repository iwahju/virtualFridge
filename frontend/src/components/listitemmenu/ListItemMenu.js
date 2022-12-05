import "./listitemmenu.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from "react";

function ListItemMenu() {
    const defaultformstate = {
        ingredient: "",
        quantity: 0,
        unit: "",
        fridge: "true"
    };
    const [formstate, setFormstate] = useState(defaultformstate);
    const handleInputChange = (e) => {
        setFormstate({
          ...formstate,
          [e.target.name]: e.target.value,
        });
      };
  return (
    <div className='listitemmenu-outer-container'>
        <div className='listitemmenu-inner-container'>
            <div>
                <h3> Add Item</h3>
            </div>
            <div>
                <form className='form'>
                
                <div className='itemname-container'>
                    <div className='text-container'>
                        Item Name
                    </div>
                    <div className='form-itemtitle'> 
                    <input 
                        type='text'
                        placeholder='Item'

                      name= "ingredient"

                      value={formstate.ingredient}
                      onChange={handleInputChange}
                    />
                    </div>
                </div>
                
                <div className='quantity-container'>
                    <div className='text-container'>
                        Quantity
                    </div>
                    <div className='form-itemtitle'> 
                    <input
                        type='text'
                        placeholder='Quantity'

                        name= "quantity"
                        value={formstate.quantity}
                        onChange={handleInputChange}
                    />
                    </div>
                </div>

                <div className='unit-container'>
                <div className='text-container'>
                        Unit
                    </div>
                <Select
                      
                      labelId="unit-label"
                      id="demo-simple-select-standard"
                      value={formstate.unit}
                      name= "unit"
                      onChange={handleInputChange}
                      label="unit"
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <input type= "text" 
                      placeholder="other"
                      name= "unit"
                      />
                      <MenuItem value={'lb'}>lbs</MenuItem>
                      <MenuItem value={'tsp'}>tsp</MenuItem>
                      <MenuItem value={'tbsp'}>tspb</MenuItem>
                      <MenuItem value={'gallon'}>gallon</MenuItem>
                      <MenuItem value={'ounce'}>ounce(s)</MenuItem>
                    </Select>


                </div>
                
                <button className="submit-button" type='submit'>Add</button>
                </form>

            </div>
            
        </div>

    </div>
  )
}

export default ListItemMenu;
import "./listitemmenu.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";

function ListItemMenu(props) {
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
    const handleFridgeClick = (fridge, e) => {
        e.preventDefault();
        setFormstate({
            ...formstate,
            fridge,
        });
        console.log(formstate);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: "/addList",
            data: formstate,
            headers: {
                Authorization: `Bearer  ${props.token}`,
            },
        }).then((response) => {
            console.log(response)
            props.setPlus(false)
        }).catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          })

    };
    return (
        <div className='listitemmenu-outer-container'>
            <div className='listitemmenu-inner-container'>
                <div>
                    <h3> Add Item</h3>
                </div>
                <div>
                    <form className='form' onSubmit={handleFormSubmit}>

                        <div className='itemname-container'>
                            <div className='text-container'>
                                Item Name
                            </div>
                            <div className='form-itemtitle'>
                                <input
                                    type='text'
                                    placeholder='Item'

                                    name="ingredient"

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

                                    name="quantity"
                                    value={formstate.quantity}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className='unit-container'>
                            <div className='text-container'>
                                Unit
                            </div>
                            <div className='unit-container'>
                                <Select

                                    labelId="unit-label"
                                    id="demo-simple-select-standard"
                                    value={formstate.unit}
                                    name="unit"
                                    onChange={handleInputChange}
                                    label="unit"
                                >
                                    <MenuItem value="">
                                    </MenuItem>
                                    <input type="text"
                                        placeholder="other"
                                        name="unit"
                                    />
                                    <MenuItem value={'lb'}>lbs</MenuItem>
                                    <MenuItem value={'tsp'}>tsp</MenuItem>
                                    <MenuItem value={'tbsp'}>tspb</MenuItem>
                                    <MenuItem value={'gallon'}>gallon</MenuItem>
                                    <MenuItem value={'ounce'}>ounce(s)</MenuItem>
                                </Select>
                            </div>
                            

                        </div>
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
                                <div className="fridge-pantryButton">
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

                                </div>

                            </Box>
                        <button className="submit-button" type='submit'>Add</button>
                    </form>

                </div>

            </div>

        </div>
    )
}
 export default ListItemMenu;

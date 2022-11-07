import React, { useState, useContext } from "react";
import "./recipemenu.css";
import { styled } from '@mui/material/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, Rating, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { FaThLarge } from "react-icons/fa";
import { CheckBox } from "@mui/icons-material";
import Select from '@mui/material/Select';


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'red',
    },
    '& .MuiRating-iconHover': {
      color: 'red',
    },
  });



function Recipemenu() {
    const defaultformstate = {
        recipeName: "",
        time: 0,
        difficulty: "",
        spice: "",
        vegetarian: false,
        vegan: false,
        dairy: false,
        nut: false,
        gluten: false,
        ingredients:"",
        steps:"",

      };
      
      
      const [formstate, setFormstate] = useState(defaultformstate);
      const handleInputChange = (e) => {
        setFormstate({
          ...formstate,
          [e.target.name]: e.target.value,
        });
      };


      const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formstate);
      };
    
  return (
    <div className='recipemenu-outer-container'>
        <div className='recipemenu-inner-container'>
        <div>
               
            <form className='form' onSubmit={handleFormSubmit}>
                
            <div className="recipe-info">
                <div className='recipename-container'>
                    <div className='text-container'>
                        Recipe Name
                    </div>
                
                    <div className='form-recipetitle'> 
                    <TextField 
                    color="success" focused 
                    sx={{width: 300}}
                    InputProps={{ sx: { height: 45 } }}
                    name="recipeName"
                    id="outlined-name"
                    onChange={handleInputChange}
                        />
                    </div>
                </div>
                
                <div className='time-container'>
                    <div className='text-container'>
                        Time to Cook
                    </div>
                    <div className='form-time'> 
                    <TextField
                        color="success" focused 
                        sx={{width: 80}}
                        InputProps={{ sx: { height: 45 } }}
                        name="time"
                        id="outlined-number"
                        type="number"
                        onChange={handleInputChange}
                    />
                    
                    </div>
                </div>

                <div className='difficulty'>
                    <div className='text-container'>
                            Difficulty
                    </div>
                    <div className='rating'>
                    <Rating
                        name="difficulty"
                        value={formstate.difficulty}
                        type='text'
                        onChange={handleInputChange}
                    />
                    </div>
                </div>

                <div className='spice'>
                    <div className='text-container'>
                            Spice Level
                    </div>
                    <div className='spice-rating'>
                    <StyledRating
                        defaultValue={1}
                        max={3}
                        getLabelText={(value) => `${value} Fire${value !== 1 ? 's' : ''}`}
                        precision={0.5}
                        icon={<WhatshotIcon fontSize="inherit" />}
                        emptyIcon={<WhatshotOutlinedIcon fontSize="inherit" />}
                        name="spice"
                        value={formstate.spice}
                        type='text'
                        onChange={handleInputChange}
                    />
                    </div>
                </div>
                    
                <div className='tags'>
                    <div className='text-container'>
                            Filters
                    </div>
                <div className='check-box'>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox name="vegetarian" onChange= {() =>setFormstate((e) => ({
                                ...e, vegetarian: !formstate.vegetarian
                            }))}
                            color="success" size="small" />}
                            label="Vegetarian"/>
                        <FormControlLabel
                            control={<Checkbox name="vegan" onChange= {() =>setFormstate((e) => ({
                                ...e, vegan: !formstate.vegan
                            }))} 
                            color="success" size="small"/>}
                            label="Vegan"/>
                        <FormControlLabel
                            control={<Checkbox name="dairyfree" onChange= {() =>setFormstate((e) => ({
                                ...e, dairy: !formstate.dairy
                            }))} 
                            color="success" size="small"/>}
                            label="Dairy Free"/>
                        <FormControlLabel
                            control={<Checkbox name="glutenfree" onChange= {() =>setFormstate((e) => ({
                                ...e, gluten: !formstate.gluten
                            }))} 
                            color="success" size="small" />}
                            label="Gluten Free"/>
                        <FormControlLabel
                            control={<Checkbox name="nutfree" onChange= {() =>setFormstate((prev) => ({
                                ...prev, nut: !formstate.nut
                            }))}  
                            color="success" size="small" />}
                            label="Nut Free"/>
                    </FormGroup>
                </div>  
                </div>  
            
            </div>
                
                <div className="ingredientsteps-container">
                <div className = 'ingredients-container'>
                        <div className='text-container'>
                            Ingredients
                        </div>
                        <TextField 
                            color="success" focused 
                            sx={{width: 600}}
                            InputProps={{ sx: { height: 150 } }}
                            name="ingredients"
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue=""
                            onChange={handleInputChange}

                    />
                </div>

                <div className='steps-container'>
                        <div className='text-container'>
                            Steps
                        </div>
                        <TextField 
                            color="success" focused 
                            sx={{width: 600}}
                            InputProps={{ sx: { height:220 } }}
                            name="steps"
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue=""
                            onChange={handleInputChange}

                    />
                </div>
                </div>



                    
                    <button className="submit-button" type='submit'>Create</button>
                    
            </form>
        </div>
            
        </div>

    </div>
  )
}

export default Recipemenu;
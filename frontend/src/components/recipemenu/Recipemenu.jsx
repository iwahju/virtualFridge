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
import Time from "./Time";
import Slider from '@mui/material/Slider';
import { grey } from '@mui/material/colors';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'green',
    },
    '& .MuiRating-iconHover': {
      color: 'black',
    },
    '& .MuiRating-iconEmpty': {
        color: 'green',
      },
  });
  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
       value: 5,
       label: '5',
      },
  ];

  function valuetext(value) {
    return `${value}`;
  }


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
            Create Your Own Recipe
            <div className='recipename-container'>
                
                    <TextField
                    id="standard-number"  label="Recipe Name" variant="standard" 
                    color="success" focused 
                    sx={{width: 500 }}
                    name="recipeName"
                    placeholder="'Pumpkin Pie'"
                    onChange={handleInputChange}
                    />
               
                </div>
                <div className='time-container'> 
                    <div className='form-time'> 
                    <TextField
                        id="standard-number"  label="Time to Cook" variant="standard" 
                        color="success" focused 
                        sx={{width: 80 }}
                        InputProps={{ 
                            sx: { input: { color: 'black' } },
                            inputProps: { max: 60, min: 5},
                            
                        } }
                        name="time"
                        placeholder="5"
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
                    <Slider
                        aria-label="small-steps"
                        defaultValue={2}
                        getAriaValueText={valuetext}
                        step={1}
                        marks= {marks}
                        min={1}
                        max={5}
                        color="success"
                        name="difficulty"
                        value={formstate.difficulty}  
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
                        max={5}
                        getLabelText={(value) => `${value} Fire${value !== 1 ? 's' : ''}`}
                        precision={0.5}
                        icon={<WhatshotIcon fontSize="inherit" />}
                        emptyIcon={<WhatshotOutlinedIcon fontSize="inherit"  />}
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
                            control={<Checkbox 
                            sx={{ color: grey[600], }}
                            name="vegetarian" onChange= {() =>setFormstate((e) => ({
                                ...e, vegetarian: !formstate.vegetarian
                            }))}
                            color="success" size="small" />}
                            label="Vegetarian"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="vegan" onChange= {() =>setFormstate((e) => ({
                                ...e, vegan: !formstate.vegan
                            }))} 
                            color="success" size="small"/>}
                            label="Vegan"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="dairyfree" onChange= {() =>setFormstate((e) => ({
                                ...e, dairy: !formstate.dairy
                            }))} 
                            color="success" size="small"/>}
                            label="Dairy Free"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="glutenfree" onChange= {() =>setFormstate((e) => ({
                                ...e, gluten: !formstate.gluten
                            }))} 
                            color="success" size="small" />}
                            label="Gluten Free"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="nutfree" onChange= {() =>setFormstate((prev) => ({
                                ...prev, nut: !formstate.nut
                            }))}  
                            color="success" size="small" />}
                            label="Nut Free"/>
                    </FormGroup>
                </div>  
                </div>  
               
                <div className = 'ingredients-container'>
                        <TextField 
                            label="Ingredients" variant="outlined" 
                            color="success" focused 
                            sx={{width: 550}}
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
                        <TextField 
                            label="Steps" variant="outlined" 
                            color="success" focused 
                            sx={{width: 550}}
                            InputProps={{ sx: { height:220 } }}
                            name="steps"
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue=""
                            onChange={handleInputChange}

                    />
                </div>
              
            
            
        <div>
               
            <form className='form' onSubmit={handleFormSubmit}>
                
            
                
               



                    <div className= 'submitbutton-container'>
                    <button className="submit-button" type='submit'>Create</button>
                    </div>
                    
            </form>
        </div>
            
        </div>

    </div>
  )
}

export default Recipemenu;
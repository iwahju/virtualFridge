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
import { FormLabel, Rating, TextField,Button} from "@mui/material";
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
    const [recipeName, setRecipeName] = React.useState("");
    const [spice, setSpice] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");
    const [time, setTime] = React.useState(0);
    const [tags, setTags] = React.useState({
        vegetarian: false,
        dairyFree: false,
        nutFree: false,
        glutenFree: false,
        vegan: false
    })
    const [ingredients, setIngredients] = React.useState([
    {
      name: "",
      quantity: "",
      unit: ""
    }
  ]);
  const [instructions, setInstructions] = React.useState([
    {
      text: ""
    }
  ]);

  


  function handleRecipeNameChange(event) {
    let newName = event.target.value;
    setRecipeName(newName);
  }
  
  function handleTagChange(event) {
    setTags(prevNote => ({
        ...prevNote, [event.target.name]: !tags[event.target.name]})
    )}

  function handleDifficultyChange(event) {
    setDifficulty(event.target.value);
  }

  function handleTimeChange(event) {
    setTime(event.target.value);
  }

  function handleSpiceChange(event) {
    setSpice(event.target.value);
  }

  function handleIngredientChange(event) {
    //grab the index and the input type
    let idx = parseInt(event.target.id.split("-")[2]);
    let inputType = event.target.id.split("-")[1];

    if (inputType === "name") {
      // we only want to modify one element, easiest way to do this is to use map to generate a new array
      // the new array will be the same with the one element modified as needed
      const newIngredients = ingredients.map((ingredient, index) => {
        // check if we are at the index that we want
        if (idx !== index) {
          // if it's not the element we want to change we just return the element
          return ingredient;
        }
        // if we have the element that needs to be modified, we return the modified element
        // using object destructuring we just return the original object, with the name field modified
        return { ...ingredient, name: event.target.value };
      });
      setIngredients(newIngredients);
    } else if (inputType === "amt") {
      const newIngredients = ingredients.map((ingredient, index) => {
        if (idx !== index) {
          return ingredient;
        }
        return { ...ingredient, amount: event.target.value };
      });
      setIngredients(newIngredients);
    }
  }
  function handleIngredientRemove(event) {
    /*
     * To remove an element, we just use the array.filter function to genereate a new array without the
     * element being deleted
     */
    console.log(event.target.id);
    let idx = parseInt(event.target.id.split("-")[2]);
    console.log("Removing ingredient " + idx);
    let newIngredients = ingredients.filter(
      (ingredient, index) => idx !== index
    );
    setIngredients(newIngredients);
  }

  function handleIngredientAdd(event) {
    /*
     * Same concept as the above methods, concat returns a new array. In this case we get a new array with an
     * element containing an empty string in both fields at the end of it
     */
    let newIngredients = ingredients.concat({ name: "", amount: "" });
    setIngredients(newIngredients);
  }

  /*
   * Instruction functions are mostly the same as the ingredient functions
   * Only changes here are the object property names
   */
  function handleInstructionChange(event) {
    let idx = parseInt(event.target.id.split("-")[1]);

    const newInstructions = instructions.map((instruction, index) => {
      if (idx !== index) {
        return instruction;
      }
      return { ...instruction, text: event.target.value };
    });

    setInstructions(newInstructions);
  }

  function handleInstructionRemove(event) {
    console.log(event.target.id);
    let idx = parseInt(event.target.id.split("-")[2]);
    console.log("Removing instruction " + idx);
    let newinstructions = instructions.filter(
      (instruction, index) => idx !== index
    );
    setInstructions(newinstructions);
  }

  function handleInstructionAdd(event) {
    let newInstructions = instructions.concat({ text: "" });
    setInstructions(newInstructions);
  }

  function handleSubmit(event) {
    // prevent the default form submit action
    event.preventDefault();
    let data = {
      name: recipeName,
      difficulty: difficulty,
      time: time,
      tags: tags,
      spice: spice,
      ingredients: ingredients,
      instructions: instructions,
    };
    console.log(data);
  }
    
    
  return (
    <div className='recipemenu-outer-container'>
        
        <div className='recipemenu-inner-container'>
            Create Your Own Recipe

            <div className='recipename-container'>    
                <TextField
                id="recipe-name"
                name="recipe-name"
                label="Recipe Name"
                placeholder="A brief name for your dish"
                required
                variant="outlined"
                value={recipeName}
                onChange={handleRecipeNameChange} />               
            </div>
            
            <div className='time-container'> 
            <div className='form-time'> 
                <TextField
                id="recipe-time"
                name="recipe-time"
                label="Time"
                placeholder="(minutes)"
                required
                variant="outlined"
                value={time}
                onChange={handleTimeChange} />
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
                        value={difficulty}  
                        onChange={handleDifficultyChange}
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
                        value={spice}
                        type='text'
                        onChange={handleSpiceChange}
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
                            name="vegetarian" 
                            onChange= {handleTagChange}
                            color="success" size="small" />}
                            label="Vegetarian"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="vegan" onChange= {handleTagChange} 
                            color="success" size="small"/>}
                            label="Vegan"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="dairyFree" onChange= {handleTagChange} 
                            color="success" size="small"/>}
                            label="Dairy Free"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="glutenFree" onChange= {handleTagChange} 
                            color="success" size="small" />}
                            label="Gluten Free"/>
                        <FormControlLabel
                            control={<Checkbox 
                                sx={{ color: grey[600],}}
                                name="nutFree" onChange= {handleTagChange}  
                            color="success" size="small" />}
                            label="Nut Free"/>
                    </FormGroup>
                </div>  
                </div>  
               

                {ingredients.map((ing, idx) => {
          return (
            <div key={idx}>
              <TextField
                id={"ing-name-" + idx}
                name={"ing-name-" + idx}
                variant="outlined"
                label="Ingredient Name"
                value={ing.name}
                required
                onChange={handleIngredientChange}
              />
              <TextField
                id={"ing-amt-" + idx}
                name={"ing-amt-" + idx}
                variant="outlined"
                label="Ingredient Amount"
                value={ing.amount}
                required
                onChange={handleIngredientChange}
              />
              <Button
                id={"ing-remove-" + idx}
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleIngredientRemove}
              >
                -
              </Button>
            </div>
          );
        })}

        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleIngredientAdd}
        >
          +
        </Button>

        {instructions.map((instr, idx) => {
          return (
            <div key={idx}>
              <TextField
                id={"instr-" + idx}
                name={"instr-" + idx}
                variant="outlined"
                multiline
                value={instr.text}
                required
                onChange={handleInstructionChange}
              />

              <Button
                id={"instr-remove-" + idx}
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleInstructionRemove}
              >
                -
              </Button>
            </div>
          );
        })}

        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleInstructionAdd}
        >
          +
        </Button>
              
            
            
        <div>
               
           
                
            
                
               



                    <div className= 'submitbutton-container'>
                    <button className="submit-button" type='submit'>Create</button>
                    </div>
                    
           
        </div>
            
        </div>

    </div>
  )

    }
export default Recipemenu;
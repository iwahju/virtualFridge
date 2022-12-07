import React, { useEffect, useState } from "react";
import "./myrecipe.css";
import RecipeButton from "../recipebutton/RecipeButton";
import axios from "axios";
import { List, ListItem, ListItemText, Stack } from "@mui/material";


function MyRecipe(props) {
  
  const [allRecipes, setAllRecipes] = useState([]);
  const [isRecipesLoaded, setRecipesLoaded] = useState(false);

  useEffect(() => {
    // get recipes from API
    if (isRecipesLoaded === false) {
      axios({
        method: "GET",
        url: "/userRecipes",
        headers: {
          Authorization: `Bearer  ${props.token}`,
        },
      })
        .then((response) => {
          setAllRecipes(response.data);
        })
        .then(() => {
          setRecipesLoaded(true);
        });
    }
  });

  const inventoryItem = (item, index) => (
    <ListItem key={item.name + "__" + index}>
      <ListItemText>{item.name}</ListItemText>
    </ListItem>
  );

  return (
    <div className = "myrecipe">
    <div className = "appAside1">
       <div className="storagebox-title">
          MY RECIPES
        </div>
      <div className= "recipe-button">
        <RecipeButton token={props.token}/>
      </div> 
      <hr 
      style={{
        width: '90%',
        marginLeft: '5%',
        marginTop: '2%',
      }}
      />
      <div className="storagebox1">
      <Stack className="storagebox-content1" color={'white'}>
            <List>{allRecipes.map(inventoryItem)}</List>
      </Stack>
      </div>
    </div>
    <div className = "appAside2">
    <div className="storagebox-title2">
        </div>
        <hr 
      style={{
        width: '90%',
        marginLeft: '5%',
        height: '2px',
        color: 'black',
        borderColor: 'black',
        background: 'black',
      }}
      />
    </div>
    </div>
  )
}

export default MyRecipe;
import React from "react";
import "./grocerylist.css";
import GroceryListButton from "../grocerylistbutton/GroceryListButton";

import { List, ListItem, ListItemText, Stack } from "@mui/material";


function GroceryList(props) {

  const inventoryItem = (item, index) => (
    <ListItem key={item.ingredient + "__" + index}>
      <ListItemText>{item.ingredient}</ListItemText>
    </ListItem>
  );
  


  return (
    <div className="grocerylist">
      <div className= "storagebox-container">
        <div className="storagebox">
        <div className="storagebox-title">
          Grocery List
          </div>
          
        <div className="grocerylist-content">
        <Stack className="storagebox-content1" color={'white'}>
            <List>{fridgeItems.map(inventoryItem)}</List>
          </Stack>
        </div>
        </div>
    
      </div>
    </div>
  )
}

export default GroceryList;
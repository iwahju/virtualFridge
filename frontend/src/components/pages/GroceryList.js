import React from "react";
import "./grocerylist.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GroceryListButton from "../grocerylistbutton/GroceryListButton";

import { List, ListItem, ListItemText, Stack } from "@mui/material";


function GroceryList(props) {

  useEffect(() => {
    console.log(isProfileLoaded)
    if (isProfileLoaded === false) {
      axios({
        method: "GET",
        url: "/profile",
        headers: {
          Authorization: `Bearer  ${props.token}`,
        },
      }).then((response) => {
      setProfile(response.data);
    }).then(() => { setProfileLoaded (true)})
    // console.log(profile);
    try {
      setPantryItems(
        (profile?.items ?? []).filter(({ fridge }) => fridge=== false )
      );
      setFridgeItems(
        (profile?.items ?? []).filter(({ fridge }) => fridge)
        );
      }
      catch(e){
        console.log("empty fridge")
      }
    } 
    }, [profile]);

  
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
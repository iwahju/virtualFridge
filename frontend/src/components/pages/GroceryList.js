import "./grocerylist.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import GroceryListButton from "../grocerylistbutton/GroceryListButton";

import { List, ListItem, ListItemText, Stack } from "@mui/material";


function GroceryList(props) {

  const [profile, setProfile] = useState(null);
  const [isProfileLoaded, setProfileLoaded] = useState(false);


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
        setProfile(response.data.list);
      }).then(() => {
        setProfileLoaded(true)
      })
    }
  }, [isProfileLoaded, profile]);
  
  const DeleteItem = (index, e) => {

    console.log(index)
    axios({
      method: "POST",
      url: "/deleteList",
      data: {"index":index},
      headers: {
        Authorization: `Bearer  ${props.token}`,
      },
    }).then((response) => {
      console.log(response)
      setProfileLoaded(false)
    }).catch((error) => {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    )
    
};


  const inventoryItem = (item, index) => (
    <ListItem key={item["ingredient"] + "__" + index}>
      <ListItemText>{item["ingredient"]}</ListItemText>
      {item["unit"] !=null &&
      <ListItemText>{item["quantity"]+" "+item["unit"]}</ListItemText>
  }
  {item["unit"] ==null &&
      <ListItemText>{item["quantity"]}</ListItemText>
  }
                    <button
                      onClick={() => DeleteItem(index)}
                      className="btn btn-info"
                    >
                      delete{" "}
                    </button>
    </ListItem>
  );


  return (
    <div className="grocerylist">
      <div className="storagebox-container">
        <div className="storagebox">
          <div className="storagebox-title">
            Grocery List
          </div>

          <div className="grocerylist-content">
            
              {profile !=null &&
                
            <List>{profile.map(inventoryItem)}</List>
}


            <GroceryListButton token={props.token}  setProfileLoaded= {setProfileLoaded}/>

          </div>
        </div>

      </div>
    </div>
  )
}

export default GroceryList;
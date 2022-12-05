import "./home.css";
import React, { useEffect, useState } from "react";
import PlusButton from "../plusbutton/Plusbutton";

import EditMenu from "../editmenu/Editmenu";
import { Box } from "@mui/system";
import axios from "axios";
import { List, ListItem, ListItemText, Stack } from "@mui/material";
// import { withStyles, Typography } from "@mui/styles";


// const WhiteTextTypography = withStyles({
//   root: {
//     color: "#FFFFFF"
//   }
// })(Typography);

function Home(/** @type {/** @type {{setToken,}}*/ props) {

  const [profile, setProfile] = useState({});
  const [pantryItems, setPantryItems] = useState([]);
  const [fridgeItems, setFridgeItems] = useState([]);
  const [editedIndex,setEditedIndex] = useState(-1);
  const [editedComponent,setEditedComponent] = useState(null);
  const [isProfileLoaded,setProfileLoaded] = useState(false);



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
        console.log(response.data)
        setProfile(response.data);
        
    }).then(() => { 
      setProfileLoaded (true)
    })
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
    }, [isProfileLoaded,profile]);

    const DeleteItem = (index, e) => {
      console.log(index)

      axios({
        method: "POST",
        url: "/deleteItem",
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
    }

    const EditItem = (item, e) => {
      console.log(item)
      setEditedIndex(item["index"]);
      setEditedComponent(item);
      console.log(editedIndex)
      
    }

  const renderComingSoon = (date) => {
    const currentDate = new Date();
    const dateObject = new Date(date);
    const timeDiff =  (dateObject.getTime() - currentDate.getTime())/1000;

    if (timeDiff < 0) {
      return <span>(Expired)</span>
    } else if (timeDiff < (60 * 60 * 24 * 5)) {
      return <span>(Coming Soon)</span>
    } else {
      return '';
    }
  }
  const inventoryItem = (item, index) => (
    <ListItem key={item.ingredient + "__" + index}>
      <ListItemText>{item.ingredient}{renderComingSoon(item.date)}</ListItemText>
      <ListItemText>{item.date}</ListItemText>
      <button
                      onClick={() => DeleteItem(item["index"])}
                      className="btn btn-info"
                    >
                      delete{" "}
                    </button>
                    <button
                      onClick={() => EditItem(item)}
                      className="btn btn-info"
                    >
                      edit{" "}
                    </button>
    </ListItem>
  );

return (
  <div className="home">
    <div className= "welcome"></div>
    <div className= "text">
    </div>
    
    <div className="storagebox-container1">
      <div className="storagebox">
      <div className="storagebox-title3">
            My fridge, items: {fridgeItems.length}
          </div>
        <hr 
          style={{
            width: '30%',
            marginTop: '2%',
          }}
          />
          <Stack className="storagebox-content1" color={'white'}>
            <List>{fridgeItems.map(inventoryItem)}</List>
          </Stack>
      </div>
      <div className="storagebox">
        <div className="storagebox">
        <div className="storagebox-title3">
              My Pantry, items: {pantryItems.length}
            </div>
          <hr 
          style={{
            width: '30%',
            marginTop: '2%',
          }}
          />
            <Stack className="storagebox-content1" color={'white'}>
              <List>{pantryItems.map(inventoryItem)}</List>
            </Stack>
        </div>
      </div>
      {editedIndex!=-1 && <EditMenu token={props.token} data={editedComponent} setEditedIndex={setEditedIndex} setProfileLoaded={setProfileLoaded}/>}
      <PlusButton token={props.token} setProfileLoaded={setProfileLoaded}/>
    </div>
  </div>
);
}

export default Home;
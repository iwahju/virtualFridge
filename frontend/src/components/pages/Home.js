import "./home.css";
import React, { useEffect, useState } from "react";
import PlusButton from "../plusbutton/Plusbutton";
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

  const [profile, setProfile] = useState(null);
  const [pantryItems, setPantryItems] = useState([]);
  const [fridgeItems, setFridgeItems] = useState([]);
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

  console.log({ fridgeItems, pantryItems });

  const inventoryItem = (item, index) => (
    <ListItem key={item.ingredient + "__" + index}>
      <ListItemText>{item.ingredient}</ListItemText>
      <ListItemText>{item.date}</ListItemText>
    </ListItem>
  );

//   return (
//     <div className="home">
//       <div className="storagebox-container">
//         <div className="storagebox">
//           <div className="storagebox-title">
//             My fridge, items: {fridgeItems.length}
//           </div>
//           <Stack className="storagebox-content">
//             <List>{fridgeItems.map(inventoryItem)}</List>
//           </Stack>
//         </div>
//         <div className="storagebox">
//           <div className="storagebox">
//             <div className="storagebox-title">
//               My Pantry, items: {pantryItems.length}
//             </div>
//             <Stack className="storagebox-content">
//               <List>{pantryItems.map(inventoryItem)}</List>
//             </Stack>
//           </div>
//         </div>
//         <PlusButton />
//       </div>
//     </div>
//   );
// }

// export default Home;

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
      <PlusButton token={props.token}/>
    </div>
  </div>
);
}

export default Home;
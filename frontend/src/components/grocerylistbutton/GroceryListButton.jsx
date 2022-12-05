import React,{useState} from "react";
import "./grocerylistbutton.css";
import ListItemMenu from "../listitemmenu/ListItemMenu";

function GroceryListButton(props) {
    const [plus, setPlus] = useState(false) 
    const showPlus = () => setPlus(!plus)
  
      return (
          <div className="createbuttoncontainer">
              <div className="createbutton" onClick={showPlus} >
                Add Item
          </div>
          
          {plus && <ListItemMenu/>}
          </div>
  
      )
  }
  
  export default GroceryListButton;
import React from "react";
import "./grocerylist.css";
import GroceryListButton from "../grocerylistbutton/GroceryListButton";


function GroceryList(props) {
  return (
    <div className="grocerylist">
      <div className= "storagebox-container">
        <div className="storagebox">
        <div className="storagebox-title">
          Grocery List
          </div>
        <div className="grocerylist-content">
            <GroceryListButton token={props.token}/>
        </div>
        </div>
    
      </div>
    </div>
  )
}

export default GroceryList;
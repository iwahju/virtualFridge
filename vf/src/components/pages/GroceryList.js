import React from "react";
import "./grocerylist.css";
import GroceryListButton from "../grocerylistbutton/GroceryListButton";


function GroceryList() {
  return (
    <div className="grocerylist">
      <div className= "storagebox-container">
        <div className="storagebox">
        <div className="storagebox-title">
          Grocery List
          </div>
        <div className="grocerylist-content">
            <GroceryListButton />
        </div>
        </div>
    
      </div>
    </div>
  )
}

export default GroceryList;
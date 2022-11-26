import React from "react";
import "./myrecipe.css";
import RecipeButton from "../recipebutton/RecipeButton";


function MyRecipe() {
  return (
    <div className="myrecipe">
      <div className= "storagebox-container">
        <div className="storagebox">
        <div className="storagebox-title">
          My Recipes
          </div>
        <div className="storagebox-content">
          
        <RecipeButton />
        </div>
        </div>
        <div className="storagebox">
        <div className="storagebox-title">
          Bookmarked
          </div>
        <div className="storagebox-content">
        </div>
        </div>
    
      </div>
    </div>
  )
}

export default MyRecipe;
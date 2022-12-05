import React from "react";
import "./myrecipe.css";
import RecipeButton from "../recipebutton/RecipeButton";


function MyRecipe(props) {
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
      </div>
    </div>
    <div className = "appAside2">
    <div className="storagebox-title2">
          BOOKMARKED RECIPES
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
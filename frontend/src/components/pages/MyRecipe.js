import React from "react";
import "./myrecipe.css";
import RecipeMenu from "../recipemenu/Recipemenu";


function MyRecipe(props) {
  return (
    <div className = "myrecipe">
    <div className = "appAside1">
       <div className="storagebox-title">
          MY RECIPES
        </div>
     
      <hr 
      style={{
        width: '90%',
        marginLeft: '5%',
        marginTop: '0%',
      }}
      />
      <div className="storagebox1">
      </div>
    </div>
    <div className = "appAside2">
     <RecipeMenu/>
    </div>
    </div>
  )
}

export default MyRecipe;
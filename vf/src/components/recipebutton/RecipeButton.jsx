import React,{useState} from "react";
import Recipemenu from '../recipemenu/Recipemenu';
import "./recipebutton.css";

function RecipeButton() {
    const [plus, setPlus] = useState(false) 
    const showPlus = () => setPlus(!plus)
  
      return (
          <div className="createbuttoncontainer">
              <div className="createbutton" onClick={showPlus} >
                Create Recipe
          </div>
          {plus && <Recipemenu />}
          </div>
  
      )
  }
  
  export default RecipeButton;
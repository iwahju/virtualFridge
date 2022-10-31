import React from 'react';
import "./recipemenu.css";
import StarRating from "../starrating/StarRating";

function Recipemenu() {
  return (
    <div className='recipemenu-outer-container'>
        <div className='recipemenu-inner-container'>
            <div>
                <h3>Create Recipe</h3>
            </div>
            <div>
                <form className='form'>
                
                <div className='recipename-container'>
                    <div className='text-container'>
                        Recipe Name
                    </div>
                    <div className='form-recipetitle'> 
                    <input 
                        type='text'
                        placeholder='Recipe Name'
                    />
                    </div>
                </div>
                
                <div className='time-container'>
                    <div className='text-container'>
                        Time
                    </div>
                    <div className='form-time'> 
                    <input
                        type='text'
                        placeholder='Time'
                    />
                    </div>
                </div>

                    <div className='star-rating'>
                        <div className='text-container'>
                            Difficulty
                        </div>
                        <div className='form-star'>
                        <StarRating />
                        </div>
                    </div>

                        


                    <div className= "recipe-info">
                        <div className="ingredients-container">
                            <div className= "ingredients-title">
                                Ingredients
                            </div>
                            <div classname="ingredients-content">
                            </div>
                        </div>
                    
                        <div className="instructions-container">
                            <div className="instructions-title">
                             Instructions
                            </div>
                            <div className="instructions-content">
                            </div>
                        </div>
                    
                    </div>
                    
                    <button className="submit-button" type='submit'>Create</button>
                    
                </form>
            </div>
            
        </div>

    </div>
  )
}

export default Recipemenu;
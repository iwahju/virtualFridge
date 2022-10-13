import React from 'react'
import "./plusmenu.css";


function Plusmenu() {
  return (
    <div className='plusmenu-outer-container'>
        <div className='plusmenu-inner-container'>
            <div>
                <h3>Add Item</h3>
            </div>
            <div>
                <form className='form'>
                    <div className='form-title'>
                    <input 
                        type='text'
                        placeholder='Item Name'
                    />
                    </div>
                    <div className='form-quan-date'>
                    
                    <input
                        type='text'
                        placeholder='quantity'
                    />
                    <input
                    type='text'
                    placeholder='Exp. Date'
                    />

                    </div>
                    <div>
                        <button>Fridge</button>
                        <button>Pantry</button>
                    </div>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Plusmenu
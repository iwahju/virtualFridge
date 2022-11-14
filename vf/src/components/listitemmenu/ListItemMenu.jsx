import React from 'react';
import "./listitemmenu.css";

function ListItemMenu() {
  return (
    <div className='listitemmenu-outer-container'>
        <div className='listitemmenu-inner-container'>
            <div>
                <h3> Add Item</h3>
            </div>
            <div>
                <form className='form'>
                
                <div className='itemname-container'>
                    <div className='text-container'>
                        Item Name
                    </div>
                    <div className='form-itemtitle'> 
                    <input 
                        type='text'
                        placeholder='Item'
                    />
                    </div>
                </div>
                
                <div className='quantity-container'>
                    <div className='text-container'>
                        Quantity
                    </div>
                    <div className='form-itemtitle'> 
                    <input
                        type='text'
                        placeholder='Quantity'
                    />
                    </div>
                </div>
                    <button className="submit-button" type='submit'>Add</button>
                    
                </form>
            </div>
            
        </div>

    </div>
  )
}

export default ListItemMenu;
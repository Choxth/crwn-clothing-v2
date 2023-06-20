
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'; 

import { useContext } from 'react';   // named export from react
import './cart-icon.styles.scss'; 

import { CartContext } from '../../contexts/cart.context'; 


const CartIcon = () => { 

    const { isCartOpen, setIsCartOpen, cartItems, cartCount} = useContext (CartContext);

    const toggleCartOpen = () =>  { 
        setIsCartOpen (!isCartOpen);
    }

    // This function is re-run each time the page is rendered
    const countItems = () => { 
        return cartItems.reduce( (total, cartItem) => total + cartItem.quantity, 0 ); 
    }

    /* 
        Ah very important. cartCount is a value, so react knows how to figure it out
        countItems (above) is a function, to I have to call it if I use it below
        like so: <span className='item-count'>{countItems()}</span>

        otherwise react complains that 'Functions are not valid as react child' 

    */ 




    return ( 

        <div className='cart-icon-container' onClick={toggleCartOpen}> 
            <ShoppingIcon  className='shopping-icon' /> 
            <span className='item-count'>{cartCount}</span>
        </div>

    )


}

export default CartIcon; 



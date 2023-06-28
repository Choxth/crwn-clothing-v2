

import { useContext } from 'react';   // named export from react

import { CartContext } from '../../contexts/cart.context'; 
import { CartIconContainer, ItemCount, ShoppingIcon } from  './cart-icon.styles.jsx'; 


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

        <CartIconContainer onClick={toggleCartOpen}> 
            <ShoppingIcon /> 
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>

    )


}

export default CartIcon; 



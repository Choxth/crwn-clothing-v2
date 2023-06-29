
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx'


const CartDropDown = () => {

    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const gotoCheckoutHandler = () => { 
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>

            <CartItems >
                {
                    // some array of 
                    cartItems.length ? ( 
                        cartItems.map(item => 
                          <CartItem key={item.id} cartItem={item} />)
                        ) : (
                          <EmptyMessage>Your cart is empty</EmptyMessage> 
                        )       

                }
            </CartItems>
            <Button onClick={gotoCheckoutHandler}> Go to Checkout </Button>

        </CartDropdownContainer>
    )

}

export default CartDropDown; 
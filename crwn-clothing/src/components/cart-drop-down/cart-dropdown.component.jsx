
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';



const CartDropDown = () => {

    const { cartItems, setIsCartOpen } = useContext(CartContext);

    const navigate = useNavigate();

    const gotoCheckoutHandler = () => { 
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>

            <div className='cart-items'>
                {
                    // some array of 
                    cartItems.map(item => { 
                        // console.log('_cart drop down_', item);
                        return ( <CartItem key={item.id} cartItem={item} />)

                    })  
                }
            </div>

                <Button onClick={gotoCheckoutHandler}> Go to Checkout </Button>
        </div>
    )

}

export default CartDropDown; 
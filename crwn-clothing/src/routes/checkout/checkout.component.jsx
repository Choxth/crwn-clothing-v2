import './checkout.styles.scss'

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const Checkout = () => {

    const { cartItems, addItemToCart, cartCount, cartTotal, decrementItemInCart, removeCategory, } = useContext(CartContext);

    const itemPrice = (item) => {
        const { price, quantity } = item;
        const num = price * quantity;
        return formatAsPrice(num);
    }

    const formatAsPrice = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return (

        <div className='checkout-container'>

            <div className='checkout-header'>

                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>description</span>
                </div>
                <div className='header-block'>
                    <span>quantity</span>
                </div>
                <div className='header-block'>
                    <span>price</span>
                </div>
                <div className='header-block'>
                    <span>remove</span>
                </div>
            </div>

            {cartItems.map((cartItem) => {
                const { id, name, quantity, price } = cartItem;
                return (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                );
            })}

            <span className='total'> Total: ${formatAsPrice(cartTotal)} </span>

        </div>

    )
}

export default Checkout; 
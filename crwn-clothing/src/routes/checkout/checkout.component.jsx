import './checkout.styles.scss'

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const Checkout = () => {

    const { cartItems,  cartTotal } = useContext(CartContext);

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
                const { id } = cartItem;
                return (
                    <CheckoutItem key={id} cartItem={cartItem} />
                );
            })}

            <span className='total'> Total: ${formatAsPrice(cartTotal)} </span>

        </div>

    )
}

export default Checkout; 
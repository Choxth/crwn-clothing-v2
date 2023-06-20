import './checkout-item.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {

    const { price, name, quantity, imageUrl } = cartItem;

    const { decrementItemInCart, addItemToCart, removeCategory } = useContext(CartContext);

    const decreaseCountHandler = () =>  decrementItemInCart(cartItem);
    

    const increaseCountHandler = () =>  addItemToCart(cartItem);

    const removeCategoryHandler = () => removeCategory(cartItem);

    const itemPrice = () => {
        let num = price * quantity;
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return (


        <div className='checkout-item-container' >
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>

            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseCountHandler}>
                    &#10094;
                </div>

                <span className='value' >{quantity} </span>
                <div className='arrow' onClick={increaseCountHandler}>
                    &#10095;
                </div>
            </span>

            <span className='price'> {itemPrice()} </span>

            <div className='remove-button' onClick={removeCategoryHandler} > &#10005; </div>

        </div>

    )
}

export default CheckoutItem; 
import { CartItem } from './cart.types';
import { AnyAction } from 'redux';

// import the action creators
import { setIsCartOpen, setCartItems } from './cart.action';


export type CartState = {
  readonly cartItems: CartItem[]; 
  readonly isCartOpen: boolean; 
};  

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: []
};


export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {

  if (setCartItems.match(action)) { 
    // action has been narrowed since we have passed the .match test
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  if (setIsCartOpen.match (action)) { 
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  return state; 
};

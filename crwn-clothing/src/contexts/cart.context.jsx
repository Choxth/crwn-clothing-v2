import { createContext, useEffect, useReducer } from 'react'


export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_OPEN: 'SET_CART_OPEN',

}

// helper function to add a new product to the array of cartItems
const addCartItem = (cartItems, productToAdd) => {

    // Got to return new arrays of new items, so that we don't mutate the original list
    let existingCartItem = cartItems.find(element => element.id === productToAdd.id);

    if (existingCartItem) {

        return cartItems.map((cartItem) =>
            (cartItem.id === productToAdd.id)
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return a new array containing the old items, plus a new item with a count of 1
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


// decrease the quantity of the item count to a minimum of zero, but retain the item
// practically will only be called if there is a cart item to click on, and therefore is present 
const decrementItemQuantity = (cartItems, productToRemove) => {

    const existingCartItem = cartItems.find(element => element.id === productToRemove.id);

    if (existingCartItem.quantity === 1) { 
        return removeItemEntirely (cartItems, productToRemove); 
    }

    // react doesn't detect if the cartItem has a mutated property, it only can determine if the 
    // entire object is changed. So it wont re-render if we don't return a new object. 

    return cartItems.map( (cartItem) => {

        return cartItem.id === productToRemove.id 
           ? { ...cartItem, quantity: cartItem.quantity - 1 }
           : cartItem
        
    });
}

/**
 * Here, we want to remove the entire item from the cart, regardless the count
 */
const removeItemEntirely = (cartItems, itemToRemove) => {

    return cartItems.filter((cartItem) => {
        return cartItem.id !== itemToRemove.id;
    });
}

/**
 *
 * @param state
 * @param action
 * @returns new cart object with action applied to state
 */
const cartReducer = (state, action) => {

    const {type, payload} = action;

    // here, state refers to the entire cart state, so we operate on small
    // portions therein, using the reducer. Well actually, we don't need two of these, since the 
    // items, count, and total are all completely inter-related. so one setItems function to rule them all 
    // depends on your 
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,   // spread the previous state, then add the payload that we have defined
                ...payload  // set the payload's values by property. This is such an unusual syntax
            }
            break;

        case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
            break;

        default:
            // error
            throw new Error(`Unhandled type ${type} in cartReducer`);

    }
}

// This CartContext 'object' keeps the items in the shopping cart in a context. 
// This context should again be available everywhere the UserContext is, so that we always 
// have access to the carts contents 
export const CartContext = createContext({

    isCartOpen: false,
    cartItems: [],
  
    // another way to do the cart item counting is to keep a state var that is updated with 
    // side effects 
    cartCount: 0,

    // In the same effect, keep track of the cart total value
    cartTotal: 0, 

    setIsCartOpen: () => { },
    addItemToCart: () => { },
    decrementItemInCart: () => {}, 
    removeCategory: () => {}, 

});

// This was correct
const INITIAL_CART_STATE = {
    isCartOpen: false,  // whether the cart is open or not
    cartItems: [], // the cart items
    cartCount: 0,  // number of all items in cart
    cartTotal: 0   // total cart value
}


export const CartProvider = ({ children }) => {

    // useReducer returns a state value, and a dispatch function that allows you update parts of it
    const [state, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);

    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const setCartItems = (cartItems) => {

        const action = { 
            type: CART_ACTION_TYPES.SET_CART_ITEMS, 
            payload: { 
                cartItems: cartItems, 
                cartCount: cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0), 
                cartTotal: cartItems.reduce((totalCost, cartItem) => totalCost + (cartItem.quantity * cartItem.price), 0)
            }
        }
        dispatch(action); 
    }
    const setIsCartOpen = (cartOpen) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_OPEN, payload: cartOpen})
    }


    // or increment the count if it already does
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const decrementItemInCart = (cartItemToRemove) => {
        setCartItems(decrementItemQuantity(cartItems, cartItemToRemove));
    }

    const removeCategory = (productToRemove) => {
        setCartItems(removeItemEntirely(cartItems, productToRemove));
    }

    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addItemToCart,
        decrementItemInCart,
        removeCategory  // not having this in the context definition probably breaks something 
    };
    // Remember: useEffect ( useSideEffects ) are react hooks, meant to duplicate the class based 
    // rendering from early react. 


    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
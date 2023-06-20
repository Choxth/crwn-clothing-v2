import { createContext, useState, useEffect } from 'react'



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


// This CartContext 'object' keeps the items in the shopping cart in a context. 
// This context should again be available everywhere the UserContext is, so that we always 
// have access to the carts contents 
export const CartContext = createContext({

    isCartOpen: false,
    setIsCartOpen: () => { },

    // Yes, you can have two properties in the context 
    cartItems: [],

    addItemToCart: () => { },

    decrementItemInCart: () => {}, 

    removeCategory: () => {}, 

    // another way to do the cart item counting is to keep a state var that is updated with 
    // side effects 
    cartCount: 0,

    // In the same effect, keep track of the cart total value
    cartTotal: 0

});

/* 
         
    // the nominal product object looks like
    product { 
        id, 
        name, 
        price, 
        imageUrl        
    }
 
    // our desired cartItem object looks the same with a quantity
     cartItem { 
        id, 
        name, 
        price, 
        imageUrl, 
        quantity
    }
 
 
*/

// 
export const CartProvider = ({ children }) => {

    // Ah, useState returns a pair of values, the current state and a function that updates it. 
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    // this only re-calculates when the CartItems changes, which is better than counting it in the 
    // icon, which see
    useEffect(() => {
        setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
        setCartTotal(cartItems.reduce((totalCost, cartItem) => totalCost + (cartItem.quantity * cartItem.price), 0))
    }, [cartItems])

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
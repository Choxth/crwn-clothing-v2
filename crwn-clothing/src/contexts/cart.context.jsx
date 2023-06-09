import { createContext, useState } from 'react'

// This CartContext 'object' keeps the items in the shopping cart in a context. 
// This context should again be available everywhere the UserContext is, so that we always 
// have access to the carts contents 
export const CartContext = createContext({

    isCartOpen: false, 
    setIsCartOpen: () => {}

});


// 
export const CartProvider = ({ children }) => {

    // Ah, useState returns a pair of values, the current state and a function that updates it. 
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { isCartOpen, setIsCartOpen};

    // Remember: useEffect ( useSideEffects ) are react hooks, meant to duplicate the class based 
    // rendering from early react. 

   
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
import { createContext, useState, useEffect } from 'react'
import PRODUCTS from '../shop-data.json';

// This UserContext 'object' contains the information we want to keep track of
// This is a component, that we use to wrap component children inside, so that all children 
// inside can have access to the info and the methods exposed here. 
export const ProductsContext = createContext({

    products: [],
    setProducts: (products) => {
        products = products
    }

});


// last addition, sign out the user, so that we can go forward and re-sign-back-in
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products, setProducts };


    // Remember: useEffect ( useSideEffects ) are react hooks, meant to duplicate the class based 
    // rendering from early react. 

    // it is set up that the framework will run whatever useEffect() returns, when the 
    // component unmounts. 

    // This is the only place that knows anything about user registration or sign in, and we've removed 
    // all those setter functions from the sign-in/sign-up components  
    useEffect(() => {

        setProducts(PRODUCTS);

    }, []);

    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}
import { createContext, useState, useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase.utils';
// import SHOP_DATA from '../shop-data.js';

// import { addCollectionAndDocuments } from '../utils/firebase.utils.js';

// This UserContext 'object' contains the information we want to keep track of
// This is a component, that we use to wrap component children inside, so that all children 
// inside can have access to the info and the methods exposed here. 
export const CategoriesContext = createContext({

    categoriesMap: {},
    // setProducts: (products) => {
    //     products = products
    // }

});


// last addition, sign out the user, so that we can go forward and re-sign-back-in
export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap, setCategoriesMap };


    // This will run on startup to add our SHOP_DATA.  Run as a one-off. Normally done by another program
    // useEffect(() => {

    //     addCollectionAndDocuments( 'categories', SHOP_DATA);

    // }, []);


    // This is an important pattern. When using 'useEffect' to make an async call, we DON't want to 
    // pass it an async function, but instead create an internal async function to call our function
    useEffect(() => {

        const getCategoriesMap = async () => {
            const categoryMap =  await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();

    }, [])

    // but now we have to turn around and pull the categories from firebase 

    return <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
}
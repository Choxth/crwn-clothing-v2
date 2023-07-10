import { createContext, useEffect, useReducer } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase.utils';
// import SHOP_DATA from '../shop-data.js';

// import { addCollectionAndDocuments } from '../utils/firebase.utils.js';


// enum of allowable actions
export const USER_ACTION_TYPES = { 
    SET_CURRENT_CATEGORIES_MAP: 'SET_CURRENT_CATEGORIES_MAP'
}


const INITIAL_STATE = { 
    categoriesMap: { 
        womens: [], 
        mens: [], 
        hats: [], 
        sneakers: [], 
        jackets: []
    }
}

// This UserContext 'object' contains the information we want to keep track of
// This is a component, that we use to wrap component children inside, so that all children 
// inside can have access to the info and the methods exposed here. 
export const CategoriesContext = createContext({

    categoriesMap: {},
    // setProducts: (products) => {
    //     products = products
    // }

});


// I think I'm getting it. Instead of useState to remember a bit of state, the reducer allows 
// more complex relationship and to edit the state given the type and payload. So we could set parts of 
// the state given the payload
const categoriesReducer = (state, action) => { 

    const {type, payload} = action; 
  
    switch (type) { 

        case 'SET_CURRENT_CATEGORIES_MAP': 
            return { 
                ...state,   // spread the previous state, then add the payload that we have defined
                categoriesMap: payload
            }
        break; 

        default: 
            // error 
            throw new Error(`Unhandled type ${type} in categoriesReducer`); 

    }
}


// last addition, sign out the user, so that we can go forward and re-sign-back-in
export const CategoriesProvider = ({ children }) => {

    // const [categoriesMap, setCategoriesMap] = useState({});

    const [state, dispatch] = useReducer(categoriesReducer, INITIAL_STATE); 
    const {categoriesMap} = state; 


    // This will run on startup to add our SHOP_DATA.  Run as a one-off. Normally done by another program
    // useEffect(() => {

    //     addCollectionAndDocuments( 'categories', SHOP_DATA);

    // }, []);

    const setCurrentCategoriesMap = (categoriesMap) => { 
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_CATEGORIES_MAP, payload: categoriesMap})
    }
    const value = { categoriesMap, setCurrentCategoriesMap };


    // This is an important pattern. When using 'useEffect' to make an async call, we DON't want to 
    // pass it an async function, but instead create an internal async function to call our function
    useEffect(() => {

        const getCategoriesMap = async () => {
            const categoryMap =  await getCategoriesAndDocuments();
            console.log('Got a categoryMap:', categoryMap);
            setCurrentCategoriesMap(categoryMap);
        }

        getCategoriesMap();

    }, [])

    // but now we have to turn around and pull the categories from firebase 

    return <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
}
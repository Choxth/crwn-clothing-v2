import { combineReducers } from 'redux'; 

import {userReducer} from './user/user.reducer'
import {categoriesReducer } from './categories/category.reducer';
import {cartReducer} from './cart/cart.reducer'; 

// whenever this root reducer changes one of the values, the store.js is going to be a new object. 
// 
// the RootReducer is already typed as the combined state from user, cart, and categories since we've exported 
// those types from those reducers, so we don't have to type that. 
export const rootReducer = combineReducers({  
    user: userReducer, 
    categories: categoriesReducer, 
    cart: cartReducer
} ); 
import { combineReducers } from 'redux'; 

import {userReducer} from './user/user.reducer'
import {categoriesReducer } from './categories/category.reducer';
import {cartReducer} from './cart/cart.reducer'; 

// whenever this root reducer changes one of the values, the store.js is going to be a new object. 
// 
export const RootReducer = combineReducers({  
    user: userReducer, 
    categories: categoriesReducer, 
    cart: cartReducer
} ); 
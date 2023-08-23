import { compose, legacy_createStore,  applyMiddleware } from 'redux'; 
// import logger from 'redux-logger'; 
import {RootReducer} from './root-reducer';


// Common middleware pattern
const loggerMiddleware = (store) => (next) => (action) => { 
    if (!action.type) { 
        return next(action); 
    }   
    console.log('-----------------------------------------------------------  type:', action.type);
    console.log('payload:', action.payload);
    console.log('currentState', store.getState()); 

    next(action);
    console.log('Next state:', store.getState());
}
// root-reducer 


const middleWares = [loggerMiddleware]; 

const composedEnhancers = compose(applyMiddleware( ...middleWares )); 

export const store = legacy_createStore(RootReducer , undefined, composedEnhancers); 
// export const store = createStore(rootReducer)






/** 
 * The store should store the data in it's most basic form. If you want an advanced 'view' on the 
 * data, you should use a custom selector
 */


import { Middleware } from 'redux';
import { RootState } from '../store';

// Common middleware pattern


export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => { 
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

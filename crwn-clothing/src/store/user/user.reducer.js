// enum of allowable actions
import { USER_ACTION_TYPES } from "./user.types";

export const userReducer = (state = INITIAL_STATE, action) => { 

    // console.log('-->Dispatched', state, 'action:', action);
    const { type, payload} = action; 
  
    switch (type) { 

        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return { 
                ...state,   // spread the previous state, then add the payload that we have defined
                currentUser: payload
            }
        break; 

        default: 
          return state;   // in the 
    }
}


const INITIAL_STATE = { 
    currentUser: null
}

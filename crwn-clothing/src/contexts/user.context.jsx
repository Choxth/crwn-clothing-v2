import { createContext, useState, useEffect } from 'react'

import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase.utils';

// This UserContext 'object' contains the information we want to keep track of
// This is a component, that we use to wrap component children inside, so that all children 
// inside can have access to the info and the methods exposed here. 
export const  UserContext = createContext({

    currentUser: null, 
    setCurrentUser: () => null, 


}); 


// last addition, sign out the user, so that we can go forward and re-sign-back-in
export const UserProvider = ({ children } ) => { 
    const [currentUser, setCurrentUser] = useState(null);
    const value={currentUser, setCurrentUser}; 



    // Remember: useEffect ( useSideEffects ) are react hooks, meant to duplicate the class based 
    // rendering from early react. 

    // it is set up that the framework will run whatever useEffect() returns, when the 
    // component unmounts. 

    // This is the only place that knows anything about user registration or sign in, and we've removed 
    // all those setter functions from the sign-in/sign-up components  
    useEffect(() => { 
        const unsubscribe = onAuthStateChangedListener( (user) => {

            console.log('UserProvider.User from listener == ', user);
            setCurrentUser (user); 
            if (user) { 
                createUserDocumentFromAuth(user);
            } 

        } ); 

        return unsubscribe;

    }, [] ); 

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
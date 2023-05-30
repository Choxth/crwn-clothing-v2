

import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase.utils'

import { SignUpForm } from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    /* 
    useEffect(() => {

        async function fetchData() {
          // You can await here
          const response = await getRedirectResult(auth);
          console.log(response);
          if (response) { 
            const userDocRef = await createUserDocumentFromAuth(response.user);
          }
        }
        fetchData();

      }, []); // Or [] i
*/ 


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log('user from login Popup => ', user)
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (

        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}> Sign in with google popup</button>
            <button onClick={signInWithGoogleRedirect}> Sign in with google redirect</button>

            <SignUpForm/>
        </div>

    )

}

export default SignIn; 
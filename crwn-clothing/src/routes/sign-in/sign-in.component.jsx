
import {signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'


const SignIn = () =>  { 
    const logGoogleUser = async () => { 
        const {user} = await signInWithGooglePopup(); 
        console.log('user from login Popup => ', user)
        const userDocRef = await createUserDocumentFromAuth(user);
    }
return ( 

    <div> 
        <h1>Sign in Page</h1>
        <button onClick={ logGoogleUser}> Sign in with google popup</button>
    </div>

)

}

export default SignIn; 
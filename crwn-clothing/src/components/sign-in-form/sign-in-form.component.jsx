import { useState } from 'react';
import { useDispatch } from 'react-redux';


// import { loginInWithEmailAndPassword, signInWithGooglePopup} from '../../utils/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';


// import '../sign-up-form/sign-up-form.styles.scss'
import {SignInContainer, ButtonContainer} from './sign-in-form.styles.jsx'
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

const defaultFormFields = {
    email: '',
    password: '',
};



const SignInForm = () => {


    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // The handler for the sign-in-with-google button
    const signInWithGoogle = async () => {
        // await signInWithGooglePopup();   going to dispatch the googleSignInPopup Saga action
        dispatch (googleSignInStart()); 
    } 
        

    // there is the fireAuth sign in and then there is the user document in firebase itself
    const handleSubmit = async (event) => {

        event.preventDefault(); // all of what's going to happen in the form, we're going to do it.

        try {

            // This is the original line that works 
            // const response = await loginInWithEmailAndPassword(email, password);

            // how is this different? I need to learn this. Gone with sagas 
            // await loginInWithEmailAndPassword(email, password);
            dispatch(emailSignInStart(email, password))
            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password/username');
                    break;
                case 'auth/user-not-found':
                    alert('Email address not registered');
                    break;
                default: 
                console.log('Excption authenticating with uname/password', error, '-> ', error.code);
            }
        }
    }

    // generic handleChange function works well with these parameters which are all strings and only really 
    // different in name.
    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });   // Gotta think on this. spread format populating an object 

    }
    // console.log('formFields:', formFields);

    return (

        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password </span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required={true} />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required={true} />

                <ButtonContainer>
                    <Button type="submit" >
                        Sign In
                    </Button>

                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >
                        Google sign in
                    </Button>
                </ButtonContainer>

            </form>
        </SignInContainer>
    )
}

export { SignInForm }; 
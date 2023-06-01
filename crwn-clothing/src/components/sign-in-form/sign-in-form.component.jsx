import { useState } from 'react';


import { loginInWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// import '../sign-up-form/sign-up-form.styles.scss'
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
};



const SignInForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // The handler for the sign-in-with-google button
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    // there is the fireAuth sign in and then there is the user document in firebase itself
    const handleSubmit = async (event) => {

        event.preventDefault(); // all of what's going to happen in the form, we're going to do it.

        try {

            const response = await loginInWithEmailAndPassword(email, password);

            console.log('responseuser', response);
            alert('responseuser', response);
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

        <div className='sign-in-container'>
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

                <div className='buttons-container'>
                    <Button type="submit" >
                        Sign In
                    </Button>

                    <Button type='button' buttonType='google' onClick={signInWithGoogle} >
                        Google sign in
                    </Button>
                </div>

            </form>
        </div>
    )
}

export { SignInForm }; 
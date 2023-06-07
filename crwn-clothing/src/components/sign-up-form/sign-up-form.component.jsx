import { useState, useContext } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import  FormInput  from '../form-input/form-input.component';
import Button from '../button/button.component'; 
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};



const SignUpForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => { 
        setFormFields (defaultFormFields); 
    }
    const handleSubmit = async (event) => {

        event.preventDefault(); // all of what's going to happen in the form, we're going to do it.

        if (password !== confirmPassword) {
            console.log('passwords dont match');
            return;
        }
        try {

            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log('responseuser', user);

            await createUserDocumentFromAuth( user, { displayName }); 
            // confirm for them that they've signed up somehow 
            
            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') { 
                alert('Cannot create user, email already in use');
            }
            console.log('Excption getting uname/password', error);
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

        <div className='sign-up-container'>
            <h2>I do not have an account</h2>
            <span>Sign up with email and password </span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                  label='Display Name'
                  type="text" 
                  onChange={handleChange} 
                  value={displayName} 
                  name="displayName" 
                  required={true} />

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

                <FormInput 
                  label="Confirm Password" 
                  type="password" 
                  name="confirmPassword" 
                  value={confirmPassword} 
                  onChange={handleChange} 
                  required={true} />

                <Button  type="submit" >Sign Up </Button>

            </form>
        </div>

    )
}

export { SignUpForm }; 
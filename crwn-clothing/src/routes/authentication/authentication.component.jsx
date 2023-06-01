

import { SignUpForm } from '../../components/sign-up-form/sign-up-form.component';
import { SignInForm } from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss'

const Authentication = () => {

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


    return (

        <div className='authentication-container'>
            <SignInForm /> 
            <SignUpForm/>
        </div>

    ); 

}

export default Authentication; 
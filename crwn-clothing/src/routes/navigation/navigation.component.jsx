
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-drop-down/cart-dropdown.component'; 

import { UserContext } from '../../contexts/user.context' 
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase.utils'

import './navigation.styles.scss'

const Navigation = () => { 

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    // console.log(currentUser);
    return ( 
        <Fragment> 
            <div className='navigation'> 
                <Link className='logo-container' to='/' >
                    <CrwnLogo className='logo' />

                </Link> 
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'> Shop </Link>
                    { currentUser  ? ( 
                        <span className='nav-link' onClick={signOutUser}> SIGN OUT</span>
                        ) : ( 
                        <Link className='nav-link' to='/auth'> 
                          SIGN IN 
                          </Link> 
                        )
                    }   
                    <CartIcon/>                          
                </div>
                { /* <CartDropDown/> is a truthy value  so this short circuit will evaluate it 
                if the isCartOpen flag is true, and what I'm going to return is the last thing 
                evaluated, which is CartDropDown. Lesson 117 4:43 */ }
               {isCartOpen && <CartDropDown/>}     
            </div> 
            <Outlet/> 
        </Fragment> 
    )
  }
  export default Navigation;
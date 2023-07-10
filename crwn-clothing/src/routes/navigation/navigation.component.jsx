
import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-drop-down/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase.utils'

import { LogoContainer, NavigationContainer, NavLinks, NavLink } from './navigation.styles.jsx'

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    // console.log(currentUser);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/' >
                    <CrwnLogo className='logo' />

                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'> Shop </NavLink>
                    {/* styled components can change the underlying 'as' depending on what's rendered
                        who thought dynamically changing the structure was a bad idea? 
                     */  }
                    {currentUser ? (
                        <NavLink as="span" onClick={signOutUser}> SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                    }
                    <CartIcon />
                </NavLinks>
                { /* <CartDropDown/> is a truthy value  so this short circuit will evaluate it 
                if the isCartOpen flag is true, and what I'm going to return is the last thing 
                evaluated, which is CartDropDown. Lesson 117 4:43 */ }
                {isCartOpen && <CartDropDown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;
import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react'

import { useDispatch } from 'react-redux';

import Home from '../src/routes/home/home.component'
import Navigation from '../src/routes/navigation/navigation.component'
import './index.scss'
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

import { checkUserSession } from './store/user/user.action';


const App = () => {

  const dispatch = useDispatch(); 
  // This is an early requirement for the application
  useEffect(() => { 
    
    // Trying to uncouple the original from being here. This should be converted to a single 
    // promises based check if there is a current user, ( everywhere? )
    // using sagas. 

    // instead of having this state listener that responds every time the state updates, 
    // we're going to wrap this in a promise inside of firebase utils. 

    
    dispatch(checkUserSession());
    // return unsubscribe;

}, [] ); 
  // when ever a path matches the path, relative to it's parent, it will render the element. 
  // so we have / + shop + /* all mapping to shop component 


  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;

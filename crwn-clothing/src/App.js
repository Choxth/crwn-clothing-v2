import { Route, Routes } from 'react-router-dom';

import Home from '../src/routes/home/home.component'
import Navigation from '../src/routes/navigation/navigation.component'
import './index.scss'
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

const App = () => {


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

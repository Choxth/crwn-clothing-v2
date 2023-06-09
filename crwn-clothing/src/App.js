

import React from 'react';
import ReactDOM from 'react-dom' 


import { Route, Routes } from 'react-router-dom';

import Home from '../src/routes/home/home.component'
import Navigation from '../src/routes/navigation/navigation.component'
import './index.scss'
import Authentication  from './routes/authentication/authentication.component';



import Shop from './routes/shop/shop.component'; 

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>} > 
        <Route index element={<Home/> }/>
        <Route path='shop' element={<Shop/> }/>
        <Route path='auth' element={<Authentication/> }/>
      </Route>
    </Routes>
  )
}

export default App;

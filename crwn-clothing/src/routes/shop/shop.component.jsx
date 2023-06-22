
import './shop.styles.scss';

import { Routes, Route } from 'react-router-dom'; 

import CategoriesPreview  from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

// For each category, there is an array of items. Each item has its own <ProductCard> 

const Shop = () => {

    // in the parent we map /shop/* to this page, so it's given that this page will handle sub routes

    return ( 
        <Routes>

            <Route index element={<CategoriesPreview /> } /> 
            <Route path=":category" element={<Category /> } /> 

        </Routes>
    )


} 
export default Shop; 
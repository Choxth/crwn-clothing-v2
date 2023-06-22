
import { useContext, Fragment } from 'react';


import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component';

import './categories-preview.styles.scss'; 

// This just loops through all the Categories, and displays them in a CategoriesPreview component, 
// which is the array of four products in that Category

const CategoriesPreview = () => {


    const { categoriesMap } = useContext(CategoriesContext);

    // I have no idea how the javascript and the markup go together here. 
    // <Fragment> allows you to group a list of children witout adding extra nodes to the DOM. 
    // So here we have nested framents, once for the outer categories, and once for the individual products
    return (
        <>
            {
                Object.keys(categoriesMap).map(title => {

                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )


                } ) 
            }
        </>

    );
}
export default CategoriesPreview; 
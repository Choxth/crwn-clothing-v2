import './category.styles.scss';

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

// This component displays all the products of a given category in a shopping page
const Category = () => {

    const { category } = useParams();  // category destructured from the params object which is 
    const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);

    // why is this code doing this? 
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()} </h2>
            <div className='shop-category-container'>
                {
                    // Guard a little bit here against the products not having been loaded yet from firebase 
                    // probably a guard like this high up will prevent all the children from having to do the same
                    products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }

            </div>
        </>
    )


}

export default Category; 
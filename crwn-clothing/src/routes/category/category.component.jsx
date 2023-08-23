import './category.styles.scss';

import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import {useSelector} from 'react-redux';

// import { CategoriesContext } from '../../contexts/categories.context';

// This component displays all the products of a given category in a shopping page
const Category = () => {

    const { category } = useParams();  // category destructured from the params object which comes from the url

    console.log('--> Rendering/re-rendering category component')

    // useSelector is hooked into the redux store, so whenever that changes, (which happens when either part changes)
    // the categories map changes. hence the need for some form of memoization
    const categoriesMap = useSelector(selectCategoriesMap);

    // this would be analagous to gameType 
    // const { categoriesMap } = useContext(CategoriesContext);

    // of all the categories in the categoriesContext, this item saves the products for the category, 
    const [products, setProducts] = useState(categoriesMap[category]);

    // why is this code doing this? Ah, this is updating the products from the chosen category 
    // whenever the category changes. This will be analagous to populating the game list state 
    // with games from the db whenever the game type changes 
    useEffect(() => {
        console.log('2) Product usseEffect firing')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()} </h2>
            <div className='shop-category-container'>
                {
                    // Guard a little bit here against the products not having been loaded yet from firebase 
                    // probably a guard like this high up will prevent all the children from having to do the same
                    products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }

            </div>
        </Fragment>
    )


}

export default Category; 
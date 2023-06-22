import './category-preview.styles.scss';

import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

// This is a component that shows only 4 items from the category, and has a link that takes you to 
// the dedicated 'shop' page for that category. I hope. Ah, nested routes. That would be /shop/hats
const CategoryPreview = ({ title, products }) => {

    // console.log('CategoryPreview -> ', title, 'products', products);
    return (

        <div className='category-preview-container'>

            <h2>
                <Link className='nav-link' to={title} >{title.toUpperCase()} 
                </Link>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </div>

        </div>

    )


}

export default CategoryPreview; 

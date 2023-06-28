import {CategoryPreviewContainer, Preview, Title} from './category-preview.styles.jsx';

import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

// This is a component that shows only 4 items from the category, and has a link that takes you to 
// the dedicated 'shop' page for that category. I hope. Ah, nested routes. That would be /shop/hats
const CategoryPreview = ({ title, products }) => {

    // console.log('CategoryPreview -> ', title, 'products', products);
    return (

        <CategoryPreviewContainer>

            <h2>
                <Title to={title} >{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview; 

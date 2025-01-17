
import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.styles.jsx'; 
import {useNavigate} from 'react-router-dom'; 

const DirectoryItem = ({ category }) =>  {

    const { imageUrl, title, route } = category; 
    const navigate = useNavigate(); 

    const onNavigateHandler = () => navigate(route);

    return ( 
        <DirectoryItemContainer onClick = {onNavigateHandler} >

        {/* <div className='background-image' style={{
          backgroundImage: `url(${imageUrl})` }} /> */}
             <BackgroundImage imageUrl={imageUrl} />

        <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    )
}

export default DirectoryItem;
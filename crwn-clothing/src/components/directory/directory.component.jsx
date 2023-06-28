
import DirectoryItem from '../directory-item/directory-item.component'
import { DirectoryContainer } from './directory.styles';


const categories = 
[
  {
    "id": 1,
    "title": "hats",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png", 
    "route" : "shop/hats"
  },
  {
    "id": 2,
    "title": "jackets",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
    "route" : "shop/jackets"
  },
  {
    "id": 3,
    "title": "sneakers",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png", 
    "route" : "shop/sneakers"
  },
  {
    "id": 4,
    "title": "womens",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png", 
    "route" : "shop/womens"
  },
  {
    "id": 5,
    "title": "mens",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
    "route" : "shop/mens"
  }
]; 
/** 
 * Given a props.categories array, this component renders out the repeated pattern 
 * of all the CategoryItems that make it up
 */
const Directory = () => (  

  // points to remember. 1) single functional component method. Returns jsx 
  // Given the single return value, my arrow function returns all this

    // 2) returning jsx
    <DirectoryContainer> 

    { 
    // 3) JS code surrounded by {}s haha be sure to put js comments within the js space 
    // otherwise they're text!!! Crazy that the above comments are in JS space, but once the 
    // first html is encountered, we're in jsx mode

    categories.map ((category) =>  (
        <DirectoryItem key={category.id} category={category} /> 
      ))
      // and then some more jsx.. :) 
      
      } 
    </DirectoryContainer> 
  )


export default Directory; 
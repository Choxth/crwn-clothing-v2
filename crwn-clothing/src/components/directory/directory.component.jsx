
import CategoryItem from '../category-item/category-item.component'
import './directory.styles.scss'; 


/** 
 * Given a props.categories array, this component renders out the repeated pattern 
 * of all the CategoryItems that make it up
 */
const Directory = ({categories}) => (  

  // points to remember. 1) single functional component method. Returns jsx 
  // Given the single return value, my arrow function returns all this

    // 2) returning jsx
    <div className="directory-container"> 

    { 
    // 3) JS code surrounded by {}s haha be sure to put js comments within the js space 
    // otherwise they're text!!! Crazy that the above comments are in JS space, but once the 
    // first html is encountered, we're in jsx mode

    categories.map ((category) =>  (
        <CategoryItem key={CategoryItem.id} category={category} /> 
      ))
      // and then some more jsx.. :) 
      
      } 
    </div> 
  )


export default Directory; 
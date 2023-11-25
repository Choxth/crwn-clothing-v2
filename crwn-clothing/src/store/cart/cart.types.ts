import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'SET_CART_ITEMS',
}

// This is very cool. Adding a quantity to the existing category item properties, but leaving the 
// definintion of the category item where it is defined. (ie. Not having 2 sets of props to manage)
export type CartItem = CategoryItem & { 
  quantity: number; 
}
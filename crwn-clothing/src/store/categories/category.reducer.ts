import {  Category } from './category.types';

import {  fetchCategoriesStart, fetchCategoriesSuccess,  fetchCategoriesFailed } from './category.action';
import { AnyAction } from 'redux';

export type CategoriesState = {
  readonly categories: Category[]; 
  readonly isLoading: boolean; 
  readonly error: Error | null; 
} 

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Every reducer gets every action. We'd like to say that every single action that this reducer sees is a CategoryAction, 
// but that's not entirely true
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,action = {} as AnyAction): CategoriesState => {
  if (fetchCategoriesStart.match( action )) { 
    // action has been narrowed since we have passed the .match test
    return {...state,isLoading: true };
  }
  if (fetchCategoriesSuccess.match (action )) { 
    return { ...state, isLoading: false, categories: action.payload };
  }
  if (fetchCategoriesFailed.match (action)) { 
    return { ...state, isLoading: false, error: action.payload};
  }

  return state; 

  // case statement went here

};

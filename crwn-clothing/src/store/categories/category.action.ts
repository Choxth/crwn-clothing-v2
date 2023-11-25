import { CATEGORIES_ACTION_TYPES } from './category.types';
import { 
  createAction, 
  Action, 
  ActionWithPayload, 
  withMatcher
 } from '../../utils/reducer/reducer.utils';

import { Category } from './category.types';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

// Seemingly the best of all worlds. Here CategoryAction can only be 1 of 3 possibilities, yet the downstream 
// code will now based on the type of action whether it has a payload or not. 
export type CategoryAction = FetchCategoriesStart | FetchCategoriesFailed | FetchCategoriesSuccess; 

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));

export const fetchCategoriesFailed = withMatcher((error: Error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));


import { takeLatest, all, call, put} from 'typed-redux-saga/macro'; 

import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';


    /* The way that this works is... 

    onFetchCategories fetches the categories from database, 
    then fetchCategoriesAsync puts those results 

    put is the generator version of dispatch


    success or failure result in an action being put back into the system for later consumption

    */ 

  export function* fetchCategoriesAsync() { 
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments, 'categories' );
        yield* put( fetchCategoriesSuccess(categoriesArray));

      } catch (error) {
        yield* put (fetchCategoriesFailed(error as Error));
      }

  }

  export function* onFetchCategories() { 
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
  }


  export function* categoriesSaga() { 
    yield all([call ( onFetchCategories)]);   // put our functions in the array

    // nothing here happens until all() is done


  }
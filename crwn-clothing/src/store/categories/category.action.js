
import {createAction} from '../../utils/reducer/reducer.utils.js'
import { CATEGORIES_ACTION_TYPES } from './category.types.js'

export const setCategories = (categories) => 
    createAction (CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories)  // { type, payload} 
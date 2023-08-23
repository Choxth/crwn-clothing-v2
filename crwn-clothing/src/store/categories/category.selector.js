
// Here you could have some business logic. We simply map from the array structure into a map that 
// the component uses, which is a good start. 
import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;


export const selectCategories = createSelector (
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);
// This selection code is re-running always, generating a new map for the same input values, and needs some 
// memoization. Here, I can see the point of that, since if state has the same contents, cache the map, and only return 
// a different value if changd. But we can't really know if the categories that have been fetched from the 
// db have changed products? We can tell if the
export const selectCategoriesMap = createSelector(
    [selectCategories],

    (categories) => {
        return categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});

    });
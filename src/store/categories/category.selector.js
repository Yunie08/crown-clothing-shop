import { createSelector } from "reselect";

// Input selector : Return only the slice we want from the redux store
const selectCategoryReducer = (state) => state.categories;

// Memoized selector
// Here returns the categories array stored in the categories slice of the redux store
export const selectCategories = createSelector(
  // array of input selectors
  [selectCategoryReducer],
  // output of the input selectors chosen
  (categoriesSlice) => categoriesSlice.categories
);

// 'Nested' memoized selector
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

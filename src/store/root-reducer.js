import { combineReducers } from "redux";

// Reducers
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

// Root reducer combining all the reducers in our app
// {reducerName : reducerFunction}
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

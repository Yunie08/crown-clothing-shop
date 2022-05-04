import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";

// function* => signature of a ES6 generator function
// a function that pauses when reaching a yield key
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}

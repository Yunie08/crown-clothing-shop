import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import CATEGORIES_ACTION_TYPES from "./category.types";

// Generators : respond to actions

export function* fetchCategoriesAsync() {
  try {
    // call(function, function parameters) : to use a function as a saga effect
    const categoriesArray = yield call(getCategoriesAndDocuments);
    // put() : replaces dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// Responding to fetchCategoriesStart
export function* onFetchCategories() {
  // takeLatest : when an action is triggered multiple times, take only the latest
  // takeLatest(action to which we want to respond to, what we want to happen)
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Main export from this saga file
// Sort of accumulator that holds all of the sagas related to the category slice
export function* categoriesSaga() {
  // all([]) : effect to run everything inside the array and only complete when everything is done
  // inside the array we add generators
  yield all([call(onFetchCategories)]);
}

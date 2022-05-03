// State lives here // Actions received and dispatched here
// For learning purposes we use redux core library but reduxjs/toolkit should used instead
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  // user blacklisted because it is already coming from our auth listener => avoid conflict
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middlewares declaration
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean); // .filter(Boolean) to get an empty array instead of a 'false' when NODE_ENV === 'production'

// When in development we use the redux devtools compose, otherwise redux regular compose
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// compose: Pass multiple functions left to right
// applyMiddleware: create a store enhancer
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);

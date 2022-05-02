// State lives here // Actions received and dispatched here
// For learning purposes we use redux core library but reduxjs/toolkit should used instead
import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

// Homemade logger
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  // user blacklisted because it is already coming from our auth listener => avoid conflict
  blacklist: ["user", "categories"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middlewares declaration
const middleWares = [loggerMiddleware];

// compose: Pass multiple functions left to right
// applyMiddleware: create a store enhancer
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);

import USER_ACTION_TYPES from "./user.types";

// Initial reducer state value
const INITIAL_STATE = {
  currentUser: null,
};

// User Reducer creation
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  // type 'string' required, payload 'any' optional
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      // as every single action is dispatched to every single reducer, we need to handle the case when an action should not be treated
      // as we return the exact same state object, the reducer will not need to update
      return state;
  }
};

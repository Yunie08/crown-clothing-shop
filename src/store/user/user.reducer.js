import USER_ACTION_TYPES from "./user.types";

// Initial reducer state value
const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// User Reducer creation
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  // type 'string' required, payload 'any' optional
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return { ...state, error: payload };
    default:
      // as every single action is dispatched to every single reducer, we need to handle the case when an action should not be treated
      // as we return the exact same state object, the reducer will not need to update
      return state;
  }
};

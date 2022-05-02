import CART_ACTION_TYPES from "./cart.types";

export const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

// A reducer should only be used to set the values
// Any logic should be set in a previous 'middleware'
export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };

    default:
      return state;
  }
};

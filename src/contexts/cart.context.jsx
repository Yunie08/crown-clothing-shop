import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

// Helpers
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems constains productTo add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItems or new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const deleteOneCartItem = (cartItems, productToDelete) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDelete.id
  );

  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToDelete.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

// A reducer should only be used to set the values
// Any logic should be set in a previous 'middleware'
const cartReducer = (state, action) => {
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
        ...payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotalPrice } = state;

  // This 'middleware' function is used for add, remove and clear items
  // It receives the updatedCartItems as an argument and compute the cartCount and cartTotalPrice from it.
  // Finally, it dispatches the common set cart items action
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );

    const newCartTotalPrice = newCartItems.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotalPrice: newCartTotalPrice,
      })
    );
  };

  const toggleIsCartOpen = () => {
    const newIsCartOpen = !state.isCartOpen;
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, newIsCartOpen));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = deleteOneCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotalPrice,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import CART_ACTION_TYPES from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

// Actions
export const setIsCartOpen = (isCartOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = deleteOneCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

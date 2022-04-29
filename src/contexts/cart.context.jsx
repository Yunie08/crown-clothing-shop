import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (totalQuantity, item) => totalQuantity + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
      0
    );
    setCartTotalPrice(newCartTotal);
  }, [cartItems]);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(deleteOneCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
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

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  const value = { isCartOpen, toggleIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

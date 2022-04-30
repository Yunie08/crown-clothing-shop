import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

import React from "react";

const CartIcon = () => {
  const { toggleIsCartOpen, cartCount } = useContext(CartContext);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

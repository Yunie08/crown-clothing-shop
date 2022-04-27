import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

import React from "react";

const CartIcon = () => {
  const { toggleIsCartOpen } = useContext(CartContext);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="cart-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;

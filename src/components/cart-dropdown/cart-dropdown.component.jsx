import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Redux selectors
import { selectCartItems } from "../../store/cart/cart.selector";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckOutHandler = () => navigate("/checkout");

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandler}>Go to checkout</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;

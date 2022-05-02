import { useSelector, useDispatch } from "react-redux";

// Redux selectors
import { selectCartCount } from "../../store/cart/cart.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

// Redux actions
import { setIsCartOpen } from "../../store/cart/cart.action";

// Styles
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

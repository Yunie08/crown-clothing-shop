import { useDispatch, useSelector } from "react-redux";

// Redux selectors
import { selectCartItems } from "../../store/cart/cart.selector.js";

// Redux actions
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action.js";

// Styles
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const { imageUrl, name, price, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const incrementItemHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const decrementItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrementItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price} </BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

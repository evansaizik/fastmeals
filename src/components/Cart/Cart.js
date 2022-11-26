import { useContext, useState } from 'react';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { Fragment } from 'react/cjs/react.production.min';

const Cart = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartlength = cartCtx.items.length;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch('https://food-app-f4d03-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => {
    return <CartItem 
      key={item.id} 
      name={item.name} 
      amount={item.amount} 
      price={item.price} 
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  })}
  </ul>

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClick} className={classes['button--alt']}>Close</button>
      {cartlength > 0 && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  )

  const cartModalContent = ( <Fragment>
    {!isCheckout && cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
    </div>
    <div>{totalAmount}</div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClick} />}
    {!isCheckout && modalActions}
  </Fragment>)

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Successfully sent the order!</p>;
  
  return <Modal onClick={props.onClick}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>
};

export default Cart;
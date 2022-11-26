import { useContext, useState } from 'react';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
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
  
  return <Modal onClick={props.onClick}>
    {!isCheckout && cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
    </div>
    <div>{totalAmount}</div>
    {isCheckout && <Checkout onCancel={props.onClick} />}
    {!isCheckout && modalActions}
  </Modal>
};

export default Cart;
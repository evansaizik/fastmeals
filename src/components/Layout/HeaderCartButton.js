import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  
  const [btnclasses, setBtnClasses] = useState(`${classes.button}`);
  
  useEffect(() => {
    if (numberOfCartItems) {
      setBtnClasses(`${classes.button} ${classes.bump}`);

      setTimeout(() => {
        setBtnClasses(`${classes.button}`);
      }, 300);
    }
  }, [numberOfCartItems]);

  return <button className={btnclasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
  </button>
};

export default HeaderCartButton;
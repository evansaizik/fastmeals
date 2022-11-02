import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import meal from '../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = props => {
  return <Fragment>
    <header className={classes.header}>
      <h1>Aztec Meals</h1>
      <HeaderCartButton onClick={props.onClick} />
    </header>
    <div className={classes['main-image']}>
      <img src={meal} alt='A table full of food!'/>
    </div>
  </Fragment>
};

export default Header;
import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartDisp, setCartDisp] = useState(false);

  const hideCartHandler = () => {
    setCartDisp(false);
  };

  const showCartHandler = () => {
    setCartDisp(true);
  };

  return (
    <CartProvider>
      { cartDisp && <Cart onClick={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

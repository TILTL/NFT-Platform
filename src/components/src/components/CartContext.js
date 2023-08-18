import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  totalAmount: 0,
  addToCart: () => {},
  removeFromCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (nft) => {
    setCart((prevCart) => [...prevCart, nft]);
    // update the totalAmount here
  };

  const removeFromCart = (nftId) => {
    setCart((prevCart) => prevCart.filter(nft => nft.id !== nftId));
    // Adjust the totalAmount accordingly
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

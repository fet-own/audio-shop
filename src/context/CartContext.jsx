import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const addToCompare = (product) => {
    setCompareList((prevList) => {
      if (prevList.find((item) => item.id === product.id)) {
        return prevList;
      }
      return [...prevList, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prevList) =>
      prevList.filter((item) => item.id !== productId)
    );
  };

  const addToFavorites = (product) => {
    setFavoritesList((prevList) => {
      if (prevList.find((item) => item.id === product.id)) {
        return prevList;
      }
      return [...prevList, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavoritesList((prevList) =>
      prevList.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        compareList,
        addToCompare,
        removeFromCompare,
        favoritesList,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
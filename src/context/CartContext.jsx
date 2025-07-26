import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

 
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]); 
    }
  }, [user]);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

 
  const addToCart = (item) => {
    if (!user) {
      alert("Please login to add items to your cart");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };


  const updateQuantity = (id, action) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (action === "increase") return { ...item, quantity: item.quantity + 1 };
            if (action === "decrease")
              return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify([]));
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

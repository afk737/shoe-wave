import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; 

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);


  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
    } else {
      setWishlistItems([]); 
    }
  }, [user]);


  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

 
  const addToWishlist = (product) => {
    if (!user) {
      alert("Please login to add items to your wishlist");
      return;
    }

    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;

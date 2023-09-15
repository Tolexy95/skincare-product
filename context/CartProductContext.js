"use client"

import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartProviderContext = createContext();

export const CartProductContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);
 

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedTotalPrice = localStorage.getItem('totalPrice');
    const storedTotalQuantities = localStorage.getItem('totalQuantities');

    if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
    if (storedTotalPrice) setTotalPrice(parseFloat(storedTotalPrice));
    if (storedTotalQuantities) setTotalQuantities(parseInt(storedTotalQuantities));
  }, []);

  useEffect(() => {
    // Update local storage when state changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('totalQuantities', totalQuantities);
  }, [cartItems, totalPrice, totalQuantities]);



  let foundProduct;
  let index;
  
  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    // Reset quantity to 1 after adding an item to the cart
  setQuantity(1);

    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const incQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQuantity((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  };




  
  const objectPassed = {
    isOpen,
     setIsOpen,
    openSections, 
    setOpenSections,
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantities,
     quantity,
      setQuantity,
      incQty,
      decQty,
      addToCart,
      // toggleCartItemQuanitity,
      onRemove,
      setCartItems,
      setTotalPrice,
      setTotalQuantities,
  };
  return <>
   <ToastContainer position="bottom-right" autoClose={3000} />
   <CartProviderContext.Provider
    value={objectPassed}>
   

{children}

  </CartProviderContext.Provider>
  </>
};



export const useStateContext = () => useContext(CartProviderContext );

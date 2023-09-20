"use client"

import React from "react";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartProviderContext = createContext();

export const CartProductContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);
  

 
  const initialRender = useRef(true);

  useEffect(() => {
      if (JSON.parse(localStorage.getItem("cartItems"))) {
          const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
          setCartItems([...cartItems, ...storedCartItems]);
      }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("totalQuantities"))) {
      const storedTotalQuantities = JSON.parse(localStorage.getItem("totalQuantities"));
      setTotalQuantities(storedTotalQuantities);
    }
  }, []);
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("totalPrice"))) {
      const storedTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));
      setTotalPrice(storedTotalPrice);
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("orderTotal"))) {
      const storedOrderTotal= JSON.parse(localStorage.getItem("orderTotal"));
      setTotalPrice(storedOrderTotal);
    }
  }, []);

  
  useEffect(() => {
      if (initialRender.current) {
          initialRender.current = false;
          return;
      }
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
      window.localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems,totalQuantities,totalPrice]);


  let getProduct;
  
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
    getProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - getProduct.price * getProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - getProduct.quantity);
    setCartItems(newCartItems);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Find the index of the product in the cartItems array
    const foundProductIndex = cartItems.findIndex((item) => item._id === productId);
  
    if (foundProductIndex !== -1) {
      // Create a copy of the cartItems array to avoid mutating state directly
      const updatedCartItems = [...cartItems];
  
      // Update the quantity of the found product
      updatedCartItems[foundProductIndex].quantity = newQuantity;
  
      // Update the state with the modified cartItems array
      setCartItems(updatedCartItems);
  
      // Recalculate totalQuantities and totalPrice using the updatedCartItems
      const updatedTotalQuantities = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
      setTotalQuantities(updatedTotalQuantities);
  
      const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(updatedTotalPrice);
    }
  };
  
  

  
  const objectPassed = {
    isOpen,
     setIsOpen,
    openSections, 
    setOpenSections,
      cartItems,
      totalPrice,
      totalQuantities,
     quantity,
      setQuantity,
      incQty,
      decQty,
      addToCart,
      handleQuantityChange,
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

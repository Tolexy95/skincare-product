"use client"

import React from "react";
import { useState, createContext, useContext } from "react";

export const NavBarContext = createContext();

export const SideNavBarContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [products, setProducts] = useState([]);
  const [foundation, setFoundation] = useState([]);
  const [concealers, setConcealers] = useState([]);
  const [primers, setPrimers] = useState([]);
  const [powders, setPowders] = useState([]);
  const [lipBalm, setLipBalm] = useState([]);
  const [lipGloss, setLipGloss] = useState([]);
  const [lipPencils, setLipPencils] = useState([]);
  const [lipstick, setLipstick] = useState([]);
  const [eyeShadow, setEyeshadow] = useState([]);
  const [bodyCream, setBodyCream] = useState([]);
  const [eyesCream, setEyesCream] = useState([]);
  const [faceCream, setFaceCream] = useState([]);
  const [FeethandsNailsCream, setFeethandsNailsCream] = useState([]);


  const objectPassed = {
    isOpen, 
    setIsOpen, 
    openSections, 
    setOpenSections,
    foundation, 
    setFoundation,
    concealers, 
    setConcealers,
    primers, 
    setPrimers,
    powders, 
    setPowders,
    lipBalm, 
    setLipBalm,
    lipGloss, 
    setLipGloss,
    lipPencils, 
    setLipPencils,
    lipstick, 
    setLipstick,
    eyeShadow, 
    setEyeshadow,
    bodyCream, 
    setBodyCream,
    eyesCream, 
    setEyesCream,
    faceCream,
     setFaceCream,
     FeethandsNailsCream, 
     setFeethandsNailsCream,
      products, 
      setProducts,
  };

  return  <NavBarContext.Provider value={objectPassed}>

{children}

  </NavBarContext.Provider>
};



export const useStateContext = () => useContext(NavBarContext);

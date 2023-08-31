"use client"

import React from "react";
import { useState, createContext, useContext } from "react";

export const NavBarContext = createContext();

export const SideNavBarContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const objectPassed = {isOpen, setIsOpen, openSections, setOpenSections};

  return  <NavBarContext.Provider value={objectPassed}>

{children}

  </NavBarContext.Provider>
};



export const useStateContext = () => useContext(NavBarContext);

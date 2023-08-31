"use client";

import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "@/context/SideNavBarContext";

const Layout = ({ children }) => {
  const { isOpen } = useStateContext();

  return (
    <div className="layout">
      <Head>
        <title>Skincare Product</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={`${isOpen ? "shifted" : ""}`}>{children}</main>
      <footer className="px-14 -z-50">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

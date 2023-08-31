"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaRegMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="block py-2 pl-3 pr-4 rounded md:p-0 "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <FaSun className="h-6 w-6" />
      ) : (
        <FaRegMoon className="h-5 w-5" />
      )}
    </button>
  );
};

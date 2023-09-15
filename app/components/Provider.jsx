"use client";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  return <Provider store={store}>
    
    {children}
    <ToastContainer position="bottom-right" autoClose={3000} />
    
    </Provider>;
}
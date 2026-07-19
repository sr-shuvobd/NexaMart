"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/providers/ThemeProvider";

export default function ToastProvider() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
      toastStyle={{
        borderRadius: "12px",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      }}
    />
  );
}

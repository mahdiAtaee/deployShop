/* eslint-disable react/prop-types */
import React from "react";
import "@/styles/globals.css";
import AppContextProvider from "@/context/ContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./MyComponents/Context/SocketContext";

export default function Root() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  );
}

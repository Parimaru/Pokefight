import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PopoverContext from "./Context/PopoverContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PopoverContext>
        <App />
      </PopoverContext>
    </BrowserRouter>
  </React.StrictMode>
);

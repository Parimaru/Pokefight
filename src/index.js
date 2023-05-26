import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PopoverContext from "./Context/PopoverContext";
import DataContext from "./Context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataContext>
      <PopoverContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PopoverContext>
    </DataContext>
  </React.StrictMode>
);
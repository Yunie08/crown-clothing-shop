import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

// Context providers
import { CartProvider } from "./contexts/cart.context";

import { store } from "./store/store";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CartProvider>
          <App />
        </CartProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

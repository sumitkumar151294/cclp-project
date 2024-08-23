import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {" "}
    <App />
  </Provider>
)
reportWebVitals();

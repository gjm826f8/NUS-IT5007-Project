import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

import './input.css'

const element = (
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
  );
  ReactDOM.render(element, document.getElementById('contents'));
import React from "react";
import ReactDOM from "react-dom";
import Test from "./Test.jsx";


const element = (
    <React.StrictMode>
      <h1>Hello, world!</h1>
      <Test />
    </React.StrictMode>
  );
  ReactDOM.render(element, document.getElementById('contents'));
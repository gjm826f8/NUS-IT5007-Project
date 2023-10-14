import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Search from './component/Search.js';
import Display from './component/Display.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Search />
    <Display />
  </React.StrictMode>
);


/*
Drew Bozarth
dbozarth@chapman.edu
Technical-Take-Home : Client : index.js
Renders the App component
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// reportWebVitals came default in the react app created
reportWebVitals();
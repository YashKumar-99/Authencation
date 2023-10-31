import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { createContext } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));


export const AppContext = createContext();


const store = {
  name: 'aa',
  getUsesDetails: {},
  AuthStatus:false

}

// console.log(store, "sttoo")


root.render(
  <React.StrictMode>

    <AppContext.Provider value={store}>

      <BrowserRouter>

        <App />

      </BrowserRouter>
    </AppContext.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

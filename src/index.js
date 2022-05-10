import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./slices/user"
import authReducer from "./slices/auth"
import requestsReducer from "./slices/requests"
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
const store = configureStore({
  reducer:{
    user: userReducer,
    auth: authReducer,
    requests: requestsReducer
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
     
      <App />
  
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

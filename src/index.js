import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import usersReducer from "./features/posts";
import productsReducer from "./features/products";
// import imagesReducer from "./features/images";

const store = configureStore ({
  reducer: {
    users: usersReducer, //storeにreducerをセット
    products: productsReducer,
    // images: imagesReducer, 
  },
  
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>   {/* storeにアクセスできるようにする */}
    <App />
  </Provider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_opfV_e_DLTQPE_v5SMmSTiHB-3QdnRQ",
  authDomain: "my-react-blog-c1c0f.firebaseapp.com",
  projectId: "my-react-blog-c1c0f",
  storageBucket: "my-react-blog-c1c0f.appspot.com",
  messagingSenderId: "713435774527",
  appId: "1:713435774527:web:f0ef7e3fb0b399d074428a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

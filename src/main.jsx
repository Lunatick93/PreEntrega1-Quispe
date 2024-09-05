import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyBPdiZ7DXetGx2dSkp6nkpvCZ6azpfBxIk",
  authDomain: "proyecto-react-5abde.firebaseapp.com",
  projectId: "proyecto-react-5abde",
  storageBucket: "proyecto-react-5abde.appspot.com",
  messagingSenderId: "890814068374",
  appId: "1:890814068374:web:43c9a21c0c4a81549e34b7"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

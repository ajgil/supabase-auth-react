// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './pages/App'
import Footer from './components/Footer'
import Navbar from './components/Navbar';

ReactDOM.render(
  <BrowserRouter>
    <Navbar/>
      <App />
    <Footer/>
  </BrowserRouter>,
  document.getElementById('root')
)
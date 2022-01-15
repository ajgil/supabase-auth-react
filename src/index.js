// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './pages/App'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/Auth'

ReactDOM.render(
  <BrowserRouter>
    <Navbar/>
      <AuthProvider>
        <App />
      </AuthProvider>
    <Footer/>
  </BrowserRouter>,
  document.getElementById('root')
)
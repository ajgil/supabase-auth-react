// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import Footer from './components/footer'
import Navbar from './components/navbar';

import { App } from './components/App'

ReactDOM.render(
  <BrowserRouter>
    <Navbar/>
    <App />
    <Footer/>
  </BrowserRouter>,
  document.getElementById('root')
)
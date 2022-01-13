// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import Footer from './components/footer'
import Navbar from './components/navbar';

import { App } from './pages/App'

// import Stripe antifraude
import "@stripe/stripe-js"

// amplify
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <BrowserRouter>
    <Navbar/>
    <App />
    <Footer/>
  </BrowserRouter>,
  document.getElementById('root')
)
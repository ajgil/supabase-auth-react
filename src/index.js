// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'

// import Stripe antifraude
import "@stripe/stripe-js"

// amplify
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
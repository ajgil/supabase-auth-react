import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Signup } from './Signup'
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { supabase } from '../supabase'

import './App.css'
export function App() {

  return (
    <div>
      <h1>supabase-auth-react</h1>

      {/* Add routes here👇 */}
      <Router>
        {/* Wrap routes in the AuthProvider 👇 */}
        <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}
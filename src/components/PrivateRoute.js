import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'


export function PrivateRoute ({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route {...rest} render={props => {
      if (!user) {
      return( <Redirect to="/home" />)
      }
      //console.log('private route', user.user_metadata.ode)        
      if (typeof(user?.user_metadata?.ode) === 'undefined' ) {
        console.log('private route ode undefined -> redirige a klubers')        
        // role not authorised so redirect to home page
        return <Redirect to='/kluberprofile' />
      }
      
      if (user.user_metadata.ode) {
        console.log('dashboard de usuario = true')
        return <Redirect to="/odes" />
      }
      
      // authorised so return component
      return <Component {...props} />
    }} />
  )
}

/*
export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
           user ? <Component {...props} /> : <Redirect to="/home" />
        )
      }}
    ></Route>
  )
}
*/
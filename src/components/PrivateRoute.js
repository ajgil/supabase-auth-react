import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'


export function PrivateRoute ({ component: Component, ...rest }) {
  <Route {...rest} render={props => {
    const { user } = useAuth()
    if (!user) {
    return( <Redirect to="/home" />)
    }
    if(user.user_metadata){
      // role not authorised so redirect to home page
      return <Redirect to='/odes' />
    }
    if(!user.user_metadata){
      // role not authorised so redirect to home page
      return <Redirect to='/' />
    }
    // authorised so return component
    return <Component {...props} />
  }} />
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
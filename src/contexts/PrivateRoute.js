import React from 'react'
import { Navigate, Route } from 'react-router-dom'

import { useAuth } from './Auth'

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
           user ? <Component {...props} /> : Navigate('/logIn')
        )
      }}
    ></Route>
  )
}
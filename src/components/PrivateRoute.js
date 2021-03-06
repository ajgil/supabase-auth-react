import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route {...rest} render={props => {
      if (!user) {
      return( <Redirect to="/home" />)
      }
      // si ode es undefined ir a home
      // si ode true ir a /odes
      // si ode false ir a /kluber
      //console.log('private route', user.user_metadata.ode)        
           
      //if (user?.user_metadata?.ode === true) {
      //  console.log('ode intentando entrar en kluber')
      //  return <Redirect to="/odes" />
      //}

      //if (user?.user_metadata?.ode === false) {
      //  console.log('kluber intentando entrar en odes')
      //  return <Redirect to="/klubers" /> //kluberprofile
      //}
      
      //if (typeof(user?.user_metadata?.ode) === 'undefined' ) {
      //  console.log('ode undefined -> redirige a home')        
        // role not authorised redirect to home page
      //  return <Redirect to='/home' />
      //}
      // authorised so return component
      return <Component {...props} />
    }} />
  )
}
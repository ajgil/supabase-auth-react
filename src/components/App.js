import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Signup } from './Signup'
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { OdeSignup} from './Odes/Odesignup'
import { OdeLogin } from './Odes/OdeLogin'
import { OdeDashboard } from './Odes/OdeDashboard'
import { VerifyOTP } from './Odes/VerifyOTP'

import './App.css'
export function App() {

  return (
    <div>
      <h1>Welcome to Hiklub</h1>

      {/* Add routes here👇 */}
      <Router>
        {/* Wrap routes in the AuthProvider 👇 */}
        <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute extac path="/odes" component={OdeDashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/odesignup" component={OdeSignup} />
          <Route path="/odelogin" component={OdeLogin} />
          <Route path="/verify" component={VerifyOTP} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}
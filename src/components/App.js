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
//import { AnonEvents } from '../contexts/AnonEvents' //Anon Events solo se muestran en home
import AnonCard from '../components/AnonCard'
import { Booking } from '../components/Booking'
import Success from './checkout/Success'
import './App.css'

export function App() {

  /*creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
    setLocation({...location, latitude:res.data.latitude, longitude: res.data.longitude})
    setCountryCode(res.data.country_code)
    setCountryName(res.data.country_name)
    setMainState(res.data.state)
  }

  useEffect(() => {
    getData()
  }, [])
  */
  return (
    <div>
      <h1>Welcome to Hiklub</h1>
      {/* Add routes here👇 */}
      <Router>
        {/* Wrap routes in the AuthProvider 👇 */}
        <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/odes" component={OdeDashboard} />
              <PrivateRoute exact path="/booking" component={Booking} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/odesignup" component={OdeSignup} />
              <Route path="/odelogin" component={OdeLogin} />
              <Route path="/verify" component={VerifyOTP} />
              <Route path="/success" component={Success} />
            </Switch>
            {/*
            <ListEventContainer />
            */}
            <AnonCard />
        </AuthProvider>
      </Router>
      {/* Mostrar eventos anónimos geolocalizados */}
      
    </div>
  )
}
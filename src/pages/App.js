import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import '../styles/App.css';

// General - comunes
import PreRegister from '../pages/preRegister'
import { Login } from './login'

// klubers
import Register from './register'

import { Signup } from '../components/Signup'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { KluberOdeProvider } from '../contexts/UsersContext'

// odes
import RegisterODE from './registerODE'
import { OdeSignup} from './Odes/Odesignup'
import { OdeLogin } from './Odes/OdeLogin'
import { OdeDashboard } from './Odes/OdeDashboard'
import { VerifyOTP } from './Odes/VerifyOTP'
//import { AnonEvents } from '../contexts/AnonEvents' //Anon Events solo se muestran en home
import AnonCard from '../components/AnonCard'
import { Booking } from '../components/Booking'
import Success from './checkout/Success'
//import ChatUserController from '../components/Chat/ChatUserController'
//import ChatEjemplo from '../components/Chat/ChatEjemplo'
import Home from '../pages/Home'

import KluberProfile from '../components/Klubers/KluberProfile'

//import BasicTabs from './BasicTabs'

//import OdeSignupPhone from './Odes/OdeSignUpPhone'
import SecondStep from './Odes/SignUpform/SecondStep'

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
      
      {/* <h1>Welcome to Hiklub</h1>
      Add routes here👇 */}
      <Router>
        {/* Wrap routes in the AuthProvider 👇
        <Route path="/signup" component={Signup} /> */}
        <AuthProvider>
          <KluberOdeProvider>

            <Switch>
            <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/klubers" component={Dashboard} />
              <PrivateRoute exact path="/odes" component={OdeDashboard} />
              <PrivateRoute exact path="/kluber" component={KluberProfile} />
              <PrivateRoute exact path="/booking" component={Booking} />
              
              {/* Publicas comunues */}
              <Route path="/home" component={Home} />
              <Route path="/preregister" component={PreRegister}/>
              <Route path="/login" component={Login} />
              
              {/* Klubers */}
              <Route path="/signup" component={Signup} />
              
              <Route path="/register" component={Register} />

              {/* Odes */}
              <Route path="/registerode" component={RegisterODE} />
              <Route path="/odesignup" component={OdeSignup} />
              <Route path="/secondstep" component={SecondStep} />
              <Route path="/odelogin" component={OdeLogin} />
              <Route path="/verify" component={VerifyOTP} />
               {/* Stripe */}
              <Route path="/success" component={Success} />
              
              {/* Victoria pahts */}
              {/* Rutas que no funcionan :
              
                <Route path="/Register" element={Register} />
                  He creado un basicTab alternativo y tampoco se muestra
                <Route path="/registeralt" element={BasicTabs} />
              */}

            </Switch>
            {/*<ListEventContainer />*/}
            </KluberOdeProvider>
        </AuthProvider>
      </Router>
      {/* Mostrar eventos anónimos geolocalizados */}
    </div>
  )
}
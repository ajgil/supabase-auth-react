import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../contexts/PrivateRoute'
import { Signup } from '../components/oldSignup'
import { Dashboard } from '../components/Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { OdeSignup} from '../components/Odes/Odesignup'
import { OdeLogin } from '../components/Odes/OdeLogin'
import { OdeDashboard } from '../components/Odes/OdeDashboard'
import { VerifyOTP } from '../components/Odes/VerifyOTP'
//import { AnonEvents } from '../contexts/AnonEvents' //Anon Events solo se muestran en home
import AnonCard from '../components/AnonCard'
import { Booking } from '../components/Booking'
import Home from './Home'
import LogIn from './LogIn'
import PreLogIn from '../pages/preLogIn'
import Register from './register'
//import ChatUserController from '../components/Chat/ChatUserController'
//import ChatEjemplo from '../components/Chat/ChatEjemplo'

//import './App.css'

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
      {/* Add routes here👇 */}
      <Routes>
         {/*<AuthProvider> */}
           {/* Wrap routes in the AuthProvider 👇 
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/odes" component={OdeDashboard} />
          <PrivateRoute exact path="/booking" component={Booking} />
          <Route path="/PreLogIn" element={PreLogIn} />
          <Route path="/logIn" component={LogIn} />
          <Route path="/Register" element={Register} />
          <Route path="/signup" component={Signup} />
          <Route path="/odesignup" component={OdeSignup} />
          <Route path="/odelogin" component={OdeLogin} />
          <Route path="/verify" component={VerifyOTP} />
          */}
          <Route path="/" component={Home} />
          <Route path="/PreLogIn" element={PreLogIn} />
          <Route path="/odesignup" component={OdeSignup} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        {/* 
        <Route path="/chat" component={ChatEjemplo} />
        <AnonEvents /> 
        <ListEventContainer />
       
        <AnonCard />
        </AuthProvider>
         */}
      </Routes>
      {/* Mostrar eventos anónimos geolocalizados */}
      
    </div>
  )
}
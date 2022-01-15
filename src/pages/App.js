import React from 'react';
import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import { useAuth } from '../contexts/Auth'

import '../styles/App.css';

import Home from './Home';
import LogIn from './LogIn'
import Register from './Register'
import PreRegister from './PreRegister'
//import UserProfileEdit from './UserProfieEdit'
import RegisterOde from './RegisterOde';
// Kluber dashboard
import { Dashboard } from '../hiklub/klubers/KluberDashboard'

/* Primera funcion RequireAuth
function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? (
    children
    ) : (<Navigate to="/login" replace state={{ path: location }} />)
  )
}
*/

//Segunda funcion RequireAuth
function RequireAuth({ children }) {
  let user = useAuth();
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}



const App = () => {
  return (

       <Routes>
          
               <Route path="/" element={<Home />} />
               <Route path="login" element={<LogIn />} />
               <Route path="preregister" element={<PreRegister />}/>
               <Route path="registerode" element={<RegisterOde/> }/>
               <Route path="register" element={<Register />} />
               
               <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
               {/* En router dom v6 cambia el sistema de rutas privadas

               <AuthProvider>
                </AuthProvider>
               <Route path="User" element={<UserProfileEdit />} />
               */}  
         
       </Routes>
  );
}

export default App;
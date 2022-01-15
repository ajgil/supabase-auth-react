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


function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? (
    children
    ) : (<Navigate to="/login" replace state={{ path: location.pathname }} />)
  )
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
import React from 'react';
//import { AuthProvider } from '../contexts/Auth'

import '../styles/App.css';
import Home from './Home';
import LogIn from './LogIn'
import Register from './Register'
import PreRegister from './PreRegister'
//import UserProfileEdit from './UserProfieEdit'
import { Routes, Route, Link } from "react-router-dom";
import RegisterOde from './RegisterOde';

const App = () => {
  return (

       <Routes>
          
               <Route path="/" element={<Home />} />
               <Route path="login" element={<LogIn />} />
               <Route path="preregister" element={<PreRegister />}/>
               <Route path="registerode" element={<RegisterOde/> }/>
               <Route path="register" element={<Register />} />
               
               {/* En router dom v6 cambia el sistema de rutas privadas

               <AuthProvider>
                </AuthProvider>
               <Route path="User" element={<UserProfileEdit />} />
               */}  
         
       </Routes>
  );
}

export default App;
import React from 'react';
import '../styles/App.css';
import Home from './Home';
import LogIn from './LogIn'
import Register from './Register'
//import PreLogIn from './PreLogIn.js'
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
        
        {/* <Route path="PreLogIn" element={<PreLogIn />}/> 
        <Route path="User" element={<UserProfileEdit />} />
  */}
        
       
       </Routes>
       
  );
}

export default App;


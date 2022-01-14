import React from 'react';
import '../styles/App.css';
import Home from './Home';
import LogIn from './LogIn'
//import Register from './Register'
//import PreLogIn from './PreLogIn.js'
//import PreRegister from './PreRegister'
//import UserProfileEdit from './UserProfieEdit'
import { Routes, Route, Link } from "react-router-dom";
//import RegisterODE from './registerODE';

const App = () => {
  return (

       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LogIn />} />
        
        {/* <Route path="PreLogIn" element={<PreLogIn />}/> 
            <Route path="PreLogIn" element={<PreLogIn />} />
            <Route path="register" element={<Register />} />
        <Route path="RegisterODE" element={<RegisterODE/> } />
        <Route path="preregister" element={<PreRegister />}/>

        <Route path="User" element={<UserProfileEdit />} />
        
        */}
        
       
       </Routes>
       
  );
}

export default App;


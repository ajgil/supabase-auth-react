import React from 'react';
import '../styles/App.css';
import Home from './Home';
import LogIn from './LogIn'
import Register from './register'
import PreLogIn from './preLogIn'
import PreRegister from './preRegister'
import UserProfileEdit from './UserProfieEdit'
import { Routes, Route, Link } from "react-router-dom";
import RegisterODE from './registerODE';

const App = () => {
  return (

       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="LogIn" element={<LogIn />} />
        <Route path="Register" element={<Register />} />
        <Route path="RegisterODE" element={<RegisterODE/> } />
        <Route path="PreLogIn" element={<PreLogIn />}/>
        <Route path="PreRegister" element={<PreRegister />}/>
        <Route path="PreLogIn" element={<PreLogIn />} />
        <Route path="User" element={<UserProfileEdit />} />
       </Routes>
       
  );
}

export default App;

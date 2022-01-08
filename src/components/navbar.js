import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HiklubLogo from "../resources/hiklogo.png"
import '../styles/navbar.scss';
import { Grid } from '@mui/material';
import { styled } from '@mui/styles';
import SpainFlag from '../resources/spain.svg';
import { Link } from 'react-router-dom';

//Styles for buttons and navbar

const StyledNavbar = styled(Toolbar, {})({
  backgroundColor: "white"

})
const StyledButtonsLogSign = styled(Button, {})({
  color: "black",
  textTransform: "none",
  padding: "0.5rem",
  margin: "0.5rem",
  textDecoration: "none"

})

const StyledButtonEvent = styled(Button, {})({
  backgroundColor: "#93C01F",
  borderRadius: "0.4rem",
  textTransform: "none",
  padding: "0.5rem",
  margin: "0.5rem",
  boxShadow:'none'

})

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledNavbar elevation={0}>
      <Grid container item md={2}>

        <Link to="/">
        <img className="Hiklub__HomeLogo" src={HiklubLogo} alt="logo" style={{ width: "10rem", padding:"0.5rem" }} />
        </Link>

        </Grid>

        <Grid container item md={10} display="flex" justifyContent="flex-end">
        <Toolbar className="signUpButtonHome" >
          <img className="Hiklub__SpanishFlag" src={SpainFlag} alt="SpanishFlag" style={{ width: "2rem", padding:"0.5rem"}}/>
            <StyledButtonsLogSign className="button-LogIn">Blog</StyledButtonsLogSign>
            <Link to='/Register'>
            <StyledButtonsLogSign className="signUpButtonHome" >Registrarse</StyledButtonsLogSign>
            </Link>
            <Link to ="/PreLogIn">
            <StyledButtonsLogSign className="button-LogIn">Iniciar Sesión</StyledButtonsLogSign>
            </Link>
            <Link to ="/odelogin">
            <StyledButtonEvent style={{ backgroundColor: "#93C01F" }} className="button-Event" variant='contained'>Crear Evento</StyledButtonEvent>
            </Link>
        </Toolbar>
        </Grid>
      </StyledNavbar>
    </Box>
  );
}
export default Navbar;
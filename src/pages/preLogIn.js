import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from '@mui/styles';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GoogleIcon from '@mui/icons-material/Google';

const StyledButtonPreLogIn = styled(Button, {})({
    borderRadius: "3rem",
    textTransform: "none",
    padding: "0.5rem",
    margin: "0.5rem",
    boxShadow:'none',
    width:'30rem',
  
  })

  {/*const StyledImgPreLogIn = styled('img')({
      width: '100%',
      height: '20rem',
      objectFit: 'cover',


  })*/}

const PreLogIn = () =>{

    return(
        <Container>
            {/*<StyledImgPreLogIn className='preLogIn__HiklubPicture' src="https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80" alt='peopleHiking'></StyledImgPreLogIn>*/}
            <Grid item ={12} sx={{justifyContent:'center', display:'flex', mt:'6rem'}}>
            <Typography component="h1" variant="h3" sx={{fontWeight:'bold', margin:'1rem', padding:'1rem'}}>
                Iniciar Sesión
            </Typography>
            </Grid>
            <Grid container sx={{justifyContent:'center', alignItems:'center', flexDirection:'column', mb: '10rem'}}>
                <StyledButtonPreLogIn variant='contained' sx={{backgroundColor:'#DF4B38'}}> <GoogleIcon/> Entrar usando Google</StyledButtonPreLogIn>
                <StyledButtonPreLogIn variant='contained'> <FacebookRoundedIcon/> Entrar usando Facebook</StyledButtonPreLogIn>
                <Link to='/LogIn'>
                <StyledButtonPreLogIn variant='outlined' sx={{color:'black', textDecoration:'none', borderColor:'black'}}> <EmailRoundedIcon/> Entrar usando E-mail</StyledButtonPreLogIn>
                </Link>
            </Grid>
        </Container>
    )
}

export default PreLogIn;
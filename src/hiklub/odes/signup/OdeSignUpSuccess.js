import React from "react";
import Button from '@mui/material/Button';
import { styled } from "@mui/styles";
import Container from '@mui/material/Container'
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import BikeGirl from '../resources/bikegirl.png';
import { Link } from "react-router-dom";

const OdeSignUpSuccess = () => {

    const StyledSignInButtons = styled(Button, {})({
        backgroundColor: '#7C378A',
        color: 'white',
    })

    const StyledBikeGirl = styled('img', {})({
        width:'10rem',
        height:'15rem',
        objectFit:'cover',
        margin:'1rem'
    })


    return (
    <Grid container sx={{justifyContent:'center', mb:'10rem'}}>
            <Grid item md={12}>
                <Typography variant='h5' sx={{fontWeight:'bold', m:'1rem', textAlign:'center'}}>
                    ¡Su numero de telefono se ha confirmado con exito!
                </Typography>
            </Grid>
            <Grid>
                <Typography variant='h6' sx={{m:'1rem', textAlign:'center'}}>
                    ¡Recuerda confirmar tu correo electronico!
                </Typography>
            </Grid>
        <Grid item md={12} sx={{justifyContent:'center', display:'flex'}}>
            <StyledBikeGirl src={BikeGirl}  alt="chica en bici"/>
        </Grid>
<Grid sx={{display:'flex', justifyContent:'center'}}>
<Link to='/'>
        <StyledSignInButtons
        label='return Home'> Volver a Home </StyledSignInButtons>
</Link>
</Grid>
</Grid>

    )
}

export default OdeSignUpSuccess;
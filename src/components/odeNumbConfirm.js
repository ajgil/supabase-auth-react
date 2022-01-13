import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { styled } from '@mui/styles';

const odeNumbConfirm = ({prevStep, nextStep, handleChange, values}) => {

    const StyledSignInButtons = styled(Button, {})({
        backgroundColor: '#7C378A',
    })

    const Continue = e => {
        e.preventDefault();
        nextStep();
      }

      const Previous = e => {
        e.preventDefault();
        prevStep();
      }

    return (
        <Container component="main" maxWidth="xs" sx={{marginBottom:'10rem'}}>
            <Grid container >
            <Grid container sx={{display:'flex', justifyContent:'center', alignitems:'center'}}>
               <Typography variant='h6' sx= {{p:'1rem'}}>Espere unos minutos y revise el Sms que ha llegado a su movil. Confirmelo aqui</Typography>
            <TextField
            label='Código SMS'
            onChange={(handleChange='phoneCode')}
            defaultValue={values.phoneCode}
            sx={{width:'80%'}}>

            </TextField>

            </Grid>
            <Grid container sx={{m:'1rem'}}>
                <Grid item md={6} xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <StyledSignInButtons
                className="ButtonRegister__HIKLUB"
              onClick={Previous}
              variant="contained"

              sx={{ backgroundColor:"#93C01F", boxShadow:'none', width:'60%' }}
            >
              Atras
            </StyledSignInButtons>

                </Grid>
                <Grid item md={6} xs={12} sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                <StyledSignInButtons
                className="ButtonRegister__HIKLUB"
              onClick={Continue}
              variant="contained"

              sx={{ backgroundColor:"#93C01F", boxShadow:'none', width:'60%' }}
            >
              Continuar
            </StyledSignInButtons>

                </Grid>
            </Grid>
            </Grid>
        </Container>

    )
}

export default odeNumbConfirm;
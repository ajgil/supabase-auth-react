import React from "react";
import { Component } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/styles';

const StyledSignInButtons = styled(Button, {})({
    backgroundColor: '#7C378A',
})


const SignUpOdeDetails = ({nextStep, handleChange, values}) => {
    
    const Continue = e => {
        e.preventDefault();
        nextStep();
      }

        return (
            <Container component="main" maxWidth="xs" sx={{marginBottom:'10rem'}}>
        <CssBaseline />
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                {/*Firstname */}
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  onChange={handleChange('name')}
                  defaultValue={values.name}
                  autoFocus
                />
                
              </Grid>
              <Grid item xs={12}>
                   {/*Email */}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="Correo Electrónico"
                  onChange={handleChange('email')}
                  defaultValue={values.email}
                  autoComplete="Correo Electrónico"
                />
              </Grid>
              <Grid item xs={12}>
                   {/*Password */}
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={handleChange('password')}
                  defaultValue={values.password}
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                   {/*Password Confirm */}
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirmar Contraseña"
                  type="password"
                  id="password"
                  onChange={handleChange('confirmPass')}
                  defaultValue={values.confirmPass}
                  autoComplete="Confirmpassword"
                />
              </Grid>
              <Grid item xs={12}>
                   {/*PhoneNumber*/}
              <TextField
                  required
                  fullWidth
                  name="Phone"
                  label="Número de teléfono"
                  type="number"
                  id="Phone"
                  onChange={handleChange('phoneNumb')}
                  defaultValue={values.phoneNumb}
                  autoComplete="Phone-number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quiero recibir noticias y ofertas exclusivas de eventos en Hiklub."
                />
              </Grid>
              <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowConditions" color="primary"  />}
                            label="He leído y acepto las condiciónes de uso"
                        />
                    </Grid>
            </Grid>
            {<StyledSignInButtons
                className="ButtonRegister__HIKLUB"
              fullWidth
              onClick={Continue}
              variant="contained"

              sx={{ mt: 3, mb: 2, backgroundColor:"#93C01F", boxShadow:'none' }}
            >
              Continuar
            </StyledSignInButtons>}
            <Grid container sx={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/LogIn" variant="body2">
                  ¿Ya tienes una cuenta? ¡Entonces accede aquí!
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
        )
    }

export default SignUpOdeDetails;
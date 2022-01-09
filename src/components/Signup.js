// src/components/Signup.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import '../styles/register.scss';


export function Signup() {

  const StyledSignInButtons = styled(Button, {})({
    backgroundColor: '#93C01F',
})

  const StyledFBGoogleButton = styled(Button, {})({
    justifyContent: 'center',
    width: '100%'
  })

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordTwoRef = useRef()

  // Get signUp function from the auth context
  const { signUpKluber, signInWithFacebook, signInWithGoogle } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value
    const passwordTwo = passwordTwoRef.current.value

    if (password !== passwordTwo) {
      alert("Passwords don't match");
    } else {
        // Calls `signUp` function from the context
      const { error } = await signUpKluber({ email, password })

      if (error) {
        alert('error signing in')
      } else {
        alert("Check your email for your login link!")
        // Redirect user to Dashboard
        history.push('/')
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{marginBottom:'10rem'}}>
            <CssBaseline />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            ref={emailRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            ref={passwordRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Confirmar Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            ref={passwordTwoRef}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Quiero recibir noticias y ofertas exclusivas de eventos en Hiklub"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowConditions" color="primary"  />}
                            label="He leído y acepto las condiciónes de uso"
                        />
                    </Grid>
                </Grid>
                <StyledSignInButtons
                    className="ButtonRegister__HIKLUB"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#93C01F', boxShadow:'none'}}
                >
                    Registrarse
                </StyledSignInButtons>
                <Grid container sx={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
              <Grid item sx={{width:'100%'}}>

              <Typography sx={{fontWeight: 'bold'}}>
                Tambien puedes registrarte con:
              </Typography>
              <StyledFBGoogleButton  fullWidth sx={{ mt:'1rem', mb: 2, boxShadow: 'none', backgroundColor:'#DF4B38', textDecoration: 'none'}} variant='contained' > 
             <GoogleIcon sx={{m:'0.5rem'}}/> Registrarse con Google
              </StyledFBGoogleButton>
              </Grid>
              <Grid item  sx={{width:'100%'}}>
              <StyledFBGoogleButton fullWidth sx={{ mb: 2, boxShadow: 'none', backgroundColor:'#3E5C9A', textDecoration: 'none'}} variant='contained'>
              <FacebookRoundedIcon sx={{m:'0.5rem'}}/>Registrarse con Facebook
              </StyledFBGoogleButton>
              </Grid>
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
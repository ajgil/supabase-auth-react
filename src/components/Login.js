// src/components/Login.js
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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HikLogoNoTxt from '../resources/hiklogonotxt.jpg'

import '../styles/LogIn.scss';

export function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()


  // Get signUp function from the auth context
  const { signIn } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(password)
    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
      console.log(error)
    } else {
      // Redirect to home con registro 
      // kluber to Dashboard
      history.push('/klubers')
    }
  }

  /*
  async function handleSubmitOde(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(password)
    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
      console.log(error)
    } else {
      // Redirect user to Dashboard
      history.push('/ode')
    }
  }
  */

  return (
    <Container component="main" maxWidth="xs" sx={{marginBottom:'10rem'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <div>
              <img className="HikLogoNoTxt__LOGINPAGE"src={HikLogoNoTxt} alt="hiklogo"/>
            </div>
          <Typography component="h1" variant="h3" sx={{fontWeight:'bold'}}>
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              ref={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              ref={passwordRef}
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Recuérdame en este ordenador"
            />
            <Button
                className= "Botton__LoginHiklub"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#93C01F' }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidó su contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"¿No tienes una cuenta? ¡Regístrate!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    
  )
}
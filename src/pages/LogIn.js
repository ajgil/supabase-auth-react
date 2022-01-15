import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { useAuth } from '../contexts/Auth'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HikLogoNoTxt from '../resources/hiklogonotxt.jpg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/LogIn.scss';

const LogIn = () => {

  let navigate = useNavigate();
  let location = useLocation();
  let user = useAuth();

  let from = location.state?.from?.pathname || "/";

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

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
                <Link to="/register" variant="body2">
                  {"¿No tienes una cuenta? ¡Regístrate!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    )
}

export default LogIn;
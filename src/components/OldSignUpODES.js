import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Login from '../components/Login';
import Container from '@mui/material/Container';
import { styled } from '@mui/styles';
import PhoneInput from 'react-phone-input-2';
import { Typography } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import '../styles/register.scss';
import { typography } from '@mui/system';

const StyledSignInButtons = styled(Button, {})({
    backgroundColor: '#93C01F',
})

const StyledFBGoogleButton = styled(Button, {})({
     justifyContent: 'center',
     width: '100%'
})

const SignUpODES = () => {

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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="Correo Electrónico"
                  autoComplete="Correo Electrónico"
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
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="Phone"
                  label="Número de teléfono"
                  type="number"
                  id="Phone"
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
            <StyledSignInButtons
                className="ButtonRegister__HIKLUB"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:"#93C01F", boxShadow:'none' }}
            >
              Registrarse
            </StyledSignInButtons>
            <Grid container sx={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/Login" variant="body2">
                  ¿Ya tienes una cuenta? ¡Entonces accede aquí!
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    );
}

export default SignUpODES;
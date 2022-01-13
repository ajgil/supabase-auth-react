
import * as React from 'react';
import { useState } from 'react';
import onSubmit from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HikLogoNoTxt from '../resources/hikLogoNoText.jpg';
import SignUpODE from '../components/SignUpODE';
import '../styles/register.scss';


const RegisterODE= () => {

  const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	}; 

 // const state = { phone: "", eligible: false };

 /* const handleOnChangePhoneInput = value => {
    console.log(value);
    this.setState({ phone: value }, () => {
      console.log(this.state.phone);
    });
  };*/

  return (
      <Container component="main" maxWidth="xs">
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
              <img className="HikLogoNoTxt__REGISTERPAGE"src={HikLogoNoTxt} alt="hiklogo"/>
            </div>
          <Typography component="h1" variant="h3">
            Registrate
          </Typography>
          <SignUpODE/>
        </Box>
      </Container>
  );
}
export default RegisterODE;
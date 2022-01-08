import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HikLogoNoTxt from '../resources/hikLogoNoText.jpg'
import '../styles/register.scss';

import SignUpODES from '../components/SignUpODES';
//import Signup from '../components/Signup'

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`
	};
}
export function Register () {

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
            <AppBar position="static" sx={{backgroundColor:'transparent', boxShadow:'none'}}>
                      <Tabs
                          centered
                          value={value}
                          onChange={handleChange}
                          aria-label="simple tabs">
                
              <Tab label="Usuario" {...a11yProps(0)} />
                          <Tab label="Empresa" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-${0}`}>
                      <Signup />
                  </div>
                  <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-${1}`}>
            <SignUpODES/>
                  </div>
          </Box>
        </Container>
    );
}
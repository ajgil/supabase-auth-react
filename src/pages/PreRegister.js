import React from 'react';
import HikLogoNoTxt from '../resources/hikLogoNoText.jpg';
import Calendar from '../resources/calendar.jpg';
import PoolParty from '../resources/swimming.jpg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/styles';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const PreRegister = () => {

    const StyledHikLogo = styled('img', {})({
        width: '10rem',
        height: '10rem',

    })

    const StyledCalendar = styled('img', {})({
        width: '30rem',
        height: '30rem',

    })

    const StyledPool = styled('img', {})({
        width: '30rem',
        height: '30rem',
        objectFit: 'contain'

    })
    const StyledButton = styled(Button, {})({
        width: '20rem',
        height: '4rem',
        textTransform:'none',
        backgroundColor:'#93C01F',
        borderRadius:'0.4rem',
        fontWeight:'bold',
        fontSize:'1.5rem',

    })
    return (
        <Container>
            <Grid container sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', m:'1rem' }}>
                <StyledHikLogo src={HikLogoNoTxt} alt="hiklubLogo" />
                <Typography variant='h3' sx={{ justifyContent: 'center', fontWeight: 'bold', p: '2rem' }}>¡Nos encanta que te quieras unir a Hiklub!</Typography>
            </Grid>
            <Grid container sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Grid>
                    <Typography variant='h6' sx={{ justifyContent: 'center', p: '2rem', display:'flex', flexDirection:'column',  alignItems:'center' }}>En nuestra plataforma hay dos tipos de usuarios:
                        <Box sx={{fontWeight:'bold'}}>los ODEs y los Klubers</Box></Typography>
                </Grid>
            </Grid>
           <Grid container sx={{display:'flex', flexDirection:'row', flexWrap:'nowrap', justifyContent:'space-around', alignItems:'center'}}>
               <Grid item md= {6}>
               <StyledCalendar src={Calendar} alt='odesPLanning'></StyledCalendar>
               </Grid>

               <Grid item = {6}>
               <Typography variant='h6'sx={{justifyContent:'flex-end'}} ><Box sx={{fontWeight:'bold'}}> ODEs </Box> es como llamamos a los Organizadores De Eventos en nuestra plataforma. ¡Está en el nombre! </Typography>
           </Grid>
        </Grid>
        <Grid container sx={{display:'flex', flexDirection:'row', flexWrap:'nowrap', justifyContent:'space-around', alignItems:'center'}}>
               <Grid item md= {6}>
               <Typography variant='h6'sx={{justifyContent:'flex-end'}} ><Box sx={{fontWeight:'bold'}}> Los Klubers </Box> son los nombres que les damos a los usuarios que van a asistir a los eventos. Los Klubers también pueden hacer un test de afinidad que les dirá que tan bien se van a llevar con otros usuarios!</Typography>
               </Grid>

               <Grid item = {6}>
               <StyledPool src={PoolParty} alt='userParty'></StyledPool>
           </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: 'center', fontWeight: 'bold', p: '2rem' }}>
            <Grid>
            <Typography variant='h4' sx={{ justifyContent: 'center', fontWeight: 'bold', p: '2rem' }}>¡Nos encanta que te quieras unir a Hiklub!</Typography>
            </Grid>
        </Grid>
        <Grid container sx= {{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Grid item md={6} sx={{ m:'1rem'}}>
            <Link to='/registerode'>
            <StyledButton variant='contained'> Hacer Eventos </StyledButton>
            </Link>
            </Grid>
            <Grid item md={6}>
            <Link  to='/register'>
            <StyledButton sx={{ m:'1rem', mb:'5rem'}} variant='contained'> Asistir a Eventos </StyledButton>
            </Link>
            </Grid>
        </Grid>
        </Container>
    )
}

export default PreRegister;
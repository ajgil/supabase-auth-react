import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import Afinidad from '../resources/afinidad.svg';
import ColorLogo from '../resources/hiklogo.png';
import { Link } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/styles';
//import '../styles/afinitybutton.scss';

const StyledTitleButton = styled(Grid, {})({
    color: "#7D4E24",
    fontWeight: "bold",

})
const StyledSubTitleText = styled(Grid, {})({
    color: "#464646",
    fontStyle: "italic",
    fontWeight:"bold",
    flexWrap: "wrap",
    justifyContent:"flex-start",
    alignItems: "flex-start"

})

const StyledFlavorText = styled(Grid, {})({
    color: "#93C01F",
    fontWeight: "bold",
})

const StyledDivText = styled('div')({
    flexDirection: "column"

})
const StyledPText = styled('p')({
    margin: "0.2rem",
})

const StyledAffinityImg = styled('img')({
    width: "12rem"
})

const StyledAffinityButton = styled(Button, {})({
    backgroundColor: "#93C01F",
    padding: "0.5rem",
    maxWidth:"100%"

})

const AffinityButton = () => {

    return (
        <section className="privateAffinity">
            <div className="affinity-infoPrivate">
                <Container maxWidth="md">
                    <Grid container>
                        <StyledTitleButton item md={12}>
                            <h3 className="affinity-info-titlePrivate">¡Inscríbete a una actividad & conoce tu afinidad con los participantes!</h3>
                        </StyledTitleButton>
                    </Grid>
                    <Grid container >
                        <Grid item md={4}>
                            <div className="hiklub-logoPrivate">
                                <img src={ColorLogo} alt="hiklubLogoPrivate" style={{ width: "10rem", padding: "0.2rem" }} />
                            </div>
                        </Grid>
                        <StyledSubTitleText item md={4}>
                            <p className="affinity-info-textPrivate">¡Haz nuestro test para poder ver tu afinidad con los demás participantes!</p>
                        </StyledSubTitleText>
                    </Grid>
                    <Grid container alignItems="center">
                        <StyledFlavorText item md={4}>
                            <StyledDivText className="affinity-info-descPrivate">
                                <StyledPText>¡Naturaleza!</StyledPText>
                                <StyledPText>¡Actividades deportivas!</StyledPText>
                                <StyledPText>¡Excursiones Turisticas!</StyledPText>
                                <StyledPText>¡Actividades de Ocio!</StyledPText>
                            </StyledDivText>
                        </StyledFlavorText>
                        <Grid item md={4} >
                            <div className="affinity-buttonInfoPrivate">
                                <div className="btn-containerPrivate">
                                    <StyledAffinityButton direction="column" variant="contained" className="btn-test" style={{ backgroundColor: "#93C01F", boxShadow:'none' }}>Hacer test de afinidad</StyledAffinityButton>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={4}>
                            <div className="hiklub-afinidadPrivate">
                                <StyledAffinityImg className="hiklub-afinidad-imagePrivate" src={Afinidad} alt="hiklubAfinidad" direction="column" />
                            </div>
                    </Grid>
                    </Grid>
                </Container> 
            </div>
        </section>
    )
}
export default AffinityButton;
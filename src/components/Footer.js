import React from 'react';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { LinkedIn } from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';
import { YouTube } from '@mui/icons-material';
import instagramLogo from '../resources/instagramLogo.svg';
import LinkdinLogo from '../resources/linkdinLogo.svg'
import '../styles/footer.scss'

const StyledBackground = styled(Grid, {})({
   backgroundColor: "#3C3C3C",
   height: "4rem",
   width:"100%"

})
const StyledText = styled(Grid, {})({
   color: "white",
   padding: "1rem",
   marginLeft:"1rem",
   marginRight:"1rem"

})

const StyledIcons = styled(Grid, {})({
   color: "white",
   padding: "1rem",
   display: "flex",
   justifyContent:"flex-end",

})


const Footer = () => {
   return (
    < StyledBackground>
        <Grid container justifyContent="space-between">
         <StyledText >
         ©Hiklub.com 2020
         </StyledText>
         <StyledText>
         Hiklub Malaga // Hiklub Madrid // Hiklub Barcelona // Hiklub Luxemburgo
         </StyledText>
         <StyledText display="flex">
         <div className="OtherOptions__FooterPriv">
            Privacidad
         </div>
         <div className="OtherOptions__FooterCond">
            Condiciones
         </div>
            <div className="OtherOptions__FooterFAQ">
            FAQ
         </div>
         </StyledText>
         <StyledIcons >
            <div className="Icons__Facebook">
            <FacebookRoundedIcon/>
            </div>
            <div className="Icons__Linkedin">
            <LinkedIn/>
            </div>
            <div className="Icons__Insta">
            <Instagram/>
            </div>
            <div className="Icons__Youtube">
            <YouTube/>
            </div>
         </StyledIcons>
        </Grid>
    </ StyledBackground>
   );
};
export default Footer;
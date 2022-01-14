import React from 'react';
import Navbar from '../components/navbar'
import { Fragment } from 'react';
import AffinityButton from '../components/AffinityButton';
import SearchBar from '../components/SearchBar';
import Divider from '@mui/material/Divider';
import EventDest from '../components/EventDest';
import EventFuturo from '../components/eventFuturo';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';

const Home = () => {

    return (
        <div>
            <p>home public</p>
            <img className="Home__CoverImage" src="https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80" style={{width:"100%", height:"20rem", objectFit:"cover"}} alt="image"/>
            <SearchBar/>
            <AffinityButton/>
            <Grid container sx={{justifyContent:'center', width:'70%', mb:'2rem'}}>
                <Divider/>
            </Grid>

            <EventDest/>
            <EventFuturo/>
            
            {/*
            */}
        </div>
);

}

export default Home;
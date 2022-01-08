import React from 'react';
//import Navbar from '../components/navbar'
//import { Fragment } from 'react';
import AffinityButton from '../components/affinitybutton.js';
import SearchBar from '../components/searchbar';
import Divider from '@mui/material/Divider';
import EventDest from '../components/eventDest.js';
import EventFuturo from '../components/eventFuturo';
//import { Container } from '@mui/material';
import { Grid } from '@mui/material';

const Home = () => {

	console.log('estoy en home')
	return (
			<div>
					<img className="Home__CoverImage" src="https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80" style={{width:"100%", height:"20rem", objectFit:"cover"}} alt="img"/>
					<SearchBar/>
					<AffinityButton/>
					<Grid container sx={{justifyContent:'center', width:'70%', mb:'2rem'}}>
					<Divider/>
					</Grid>
					<EventDest/>
					<EventFuturo/>
			</div>
);

}

export default Home;
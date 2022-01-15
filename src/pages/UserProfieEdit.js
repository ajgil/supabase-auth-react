import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, styled } from '@mui/styles';
import { createTheme } from "@mui/system";
//import '../styles/UserStyles.scss';
import UserProfileTxt from '../components/UserProfileTxt';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
      
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  //Styles


  const CustomTab= styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    '&.Mui-selected': {
      color: "#93C01F",
      fontWeight: 'bold',
    },
  }));
  
  
  export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box
        sx={{ flexGrow: 4, bgcolor: 'background.paper', display: 'flex', height: 1000 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          indicatorColor='none'
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', mt:'2rem', ml:'4rem' }}
        >
          <CustomTab label="Mi Perfil" {...a11yProps(0)} />
          <CustomTab label="Reservas" {...a11yProps(1)} />
          <CustomTab label="Notificaciónes" {...a11yProps(2)} />
          <CustomTab label="Mensajes" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserProfileTxt/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Reservas
        </TabPanel>
        <TabPanel value={value} index={2}>
          Notificaciónes
        </TabPanel>
        <TabPanel value={value} index={3}>
          Mensajes
        </TabPanel>
      </Box>
    );
  }
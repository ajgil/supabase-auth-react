import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { styled } from "@mui/styles";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from "@mui/lab";
import Select from '@mui/material/Select';
import { LocalizationProvider } from "@mui/lab";
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import { FormControl } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import SearchIcon from '@mui/icons-material/Search';
import { minHeight } from "@mui/system";

const StyleTitleSearch = styled('h1')({
    fontStyle: "italic",
    display: "flex",
    justifyContent: "center",
    fontSize: "3rem"
});

const StyledFormControl = styled(FormControl, {})({
    width: "15rem",
});

const StyledContainer = styled(Grid, {})({
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
    marginLeft:"8rem",
    paddingBottom:"2rem"
})

const SearchBar = () => {
    const [category, setCategory] = React.useState('');

    const [location, setLocation] = React.useState('');

    const [value, setValue] = React.useState(new Date());


    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };

    return (
        <section>
            <StyleTitleSearch>¡ENCUENTRA TU ACTIVIDAD FAVORITA!</StyleTitleSearch>
            <Container>
                <StyledContainer container>
                    <Grid item={true} md={3}>
                        <Box sx={{ minWidth: 120 }}>
                            <StyledFormControl>
                                <InputLabel id="demo-simple-select-label">Selecciona Lugar</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={location}
                                    label="Selecciona Lugar plis "
                                    onChange={handleLocation}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </StyledFormControl>
                        </Box>
                    </Grid>
                    <Grid item={true} md={3}justifyContent="center">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Selecciona Fecha"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item={true} md={3} justifyContent="center">
                        <Box sx={{ minWidth: 120 }}>
                            <StyledFormControl >
                                <InputLabel id="demo-simple-select-label">Selecciona Categoría</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Selecciona Categoría"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </StyledFormControl>
                        </Box>
                    </Grid>
                    <Grid item md={3}justifyContent="center">
                    <Button variant="contained" style={{ padding: "1rem", backgroundColor: "#93C01F" }}><SearchIcon /></Button>
                    </Grid>
                </StyledContainer>
            </Container>
        </section>
    );
}
export default SearchBar;
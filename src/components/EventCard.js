import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { supabase } from '../supabase'
import { useAuth } from '../contexts/Auth'
//import { GetEventos } from '../api/GetEvents'

export default function EventCard({evento, description, ode_id}) {

  return(
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
            <Card>
              <CardContent>
              <Typography variant="h5" component="div">
                  {evento}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  OdE: {ode_id}
              </Typography>
              </CardContent>
                <CardActions>
                    {/*<Link href="/booking">Join Event</Link>*/}
                    <Button size="small">Join Event</Button>
                </CardActions>
              </Card>
      </Grid>
    </>
  )
}

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { supabase } from '../supabase'
import { useAuth } from '../contexts/Auth'
//import { GetEventos } from '../api/GetEvents'

export default function BasicCard() {
  const [evento, handleEvento] = useState([]);
  const { user } = useAuth()

  useEffect(() => {
      getEventos()
    }, [])

  const getEventos = async () => {
      //setLoading(true);
      try {
          const { error, data } = await supabase
              .from('events_')
              .select('*');

          if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

          if (data) {
          const datos = data.map(object => ({
              id: object.id,
              ode_id: object.ode_id,
              event: object.event,
              description: object.description,
              release_date: object.release_date,
              done: object.done
          }));
          handleEvento(datos);
          //console.log('datos eventos:', datos)
          }
      } catch (error) {
              console.log(error)
              alert(error.error_description || error.message);
      } finally {
          //setLoading(false);
      }
  };

  const joinEvent = async () => {
    try {
      const updates = {
        id: evento.id,
        ode: evento.ode_id,
        user_id: user?.id
        //updated_at: new Date(),
      }

      //insert an object with the key value pair, the key being the column on the table
      const { error } = await supabase
        .from("bookings")
        .insert(updates);
      if (error) throw error;

      //await getActiveItems(); //get the new active items list

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      //setAdding(false);
    }
  }

  return(
    <>
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {/* map over the datos array */}
          {evento.map((dato) => (
            <Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
              <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {/* dato.id */}
                  </Typography>
                  <Typography variant="h5" component="div">
                      {dato.event}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {dato.description}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      OdE: {dato.ode_id}
                  </Typography>
                  <Typography variant="body2">
                      Fecha de lanzamiento: {dato.release_date}
                  <br />
                  {/* dato.user_id */}
                  </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" onClick={() => joinEvent()}>Join Event</Button>
              </CardActions>
            </Card>        
          ))}
        </Grid>
      </Grid>
    </Box>
  </>
  )
}

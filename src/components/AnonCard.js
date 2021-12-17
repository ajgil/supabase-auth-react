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

export default function AnonCard() {
  const [eventos, handleEventos] = useState([]);
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
              user_id: object.user_id,
              event: object.event,
              description: object.description,
              release_date: object.release_date,
              done: object.done
          }));
          handleEventos(datos);
          console.log('datos eventos:', datos)
          }
      } catch (error) {
              console.log(error)
              alert(error.error_description || error.message);
      } finally {
          //setLoading(false);
      }
  };


  if (!user){
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {/* map over the datos array */}
            {eventos.map((dato) => (
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
                    <Typography variant="body2">
                        Fecha de lanzamiento: {dato.release_date}
                    <br />
                    {/* dato.user_id */}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Register to Join</Button>
                </CardActions>
              </Card>        
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  )
  } else {
    return(
      <>
    </>
    )
  }
}

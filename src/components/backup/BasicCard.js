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

export default function BasicCard() {
  const [evento, setEvento] = useState([]);
  const { user } = useAuth()

  useEffect(() => {
      getEventos()
    }, [])

  const getEventos = async () => {
      //setLoading(true);
      try {
          const { error, data } = await supabase
              .from('eventos')
              .select('*');

          if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

          if (data) {
          const datos = data.map(object => ({
              id: object.id,
              ode_id: object.ode_id,
              evento: object.evento,
              description: object.description,
              release_date: object.release_date,
              done: object.done
          }));
          setEvento(datos);
          //console.log('datos eventos:', datos)
          }
      } catch (error) {
              console.log(error)
              alert(error.error_description || error.message);
      } finally {
          //setLoading(false);
      }
  };

  console.log('evento', evento)
  async function joinEvent () {
    try {
      console.log('evento y ode', evento.id, evento.ode_id)
      const updates = {
        id: evento.id,
        ode_id: evento.ode_id,
        user_id: user?.id
        //updated_at: new Date(),
      }
      console.log('updates', updates)

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
          { evento.length < 1 ? (
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  No hay eventos hiklub
                </Typography>
              </CardContent>
            </Card>
          ) : (
             evento.map((item, index) => (
              <Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {/* dato.id */}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {item.evento}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        OdE: {item.ode_id}
                    </Typography>
                    <Typography variant="body2">
                        Fecha de lanzamiento: {item.release_date}
                    <br />
                        {/* 
                        data={item}
                        key={index.toString()}
                        dato.user_id 
                        */}
                  </Typography>
                </CardContent>
                <CardActions>
                    {/*<Link href="/booking">Join Event</Link>*/}
                    <Button size="small" onClick={() => joinEvent()}>Join Event</Button>
                </CardActions>
              </Card>
            )))}
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

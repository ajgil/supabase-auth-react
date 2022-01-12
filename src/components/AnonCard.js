import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/Auth'
//import { GetEventos } from '../api/GetEvents'

export default function AnonCard() {
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
              user_id: object.user_id,
              event: object.event,
              description: object.description,
              release_date: object.release_date,
              done: object.done
          }));
          setEvento(datos);
          }
      } catch (error) {
              console.log(error)
              alert(error.error_description || error.message);
      } finally {
          //setLoading(false);
      }
  };

  //console.log('AnonCard:', evento)
  if (!user){
  return (
    <>
    <h3>Eventos anonimos</h3>
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          { evento.length < 1 ? (
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                  No hay eventos hiklub
                </Typography>
              </CardContent>
            </Card>
          ) : (
             evento.map((item, index) => (
              <Card key={index} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
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
                    <Button size="small">Register to Join</Button>
                </CardActions>
              </Card>
            )))}
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

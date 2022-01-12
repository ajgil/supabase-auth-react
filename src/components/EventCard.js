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
import initStripe from "stripe";
//import { GetEventos } from '../api/GetEvents'
import axios from 'axios'


export default function EventCard({id, evento, description, ode_id, free_event, price}) {

  const { user } = useAuth()
  const [token, setToken] = useState('null')
  /*
  const onClickHandler = (event, source) => {
    // Do something with event
    console.log(event);

    // Use the passed parameter
    setText(`${source} has been clicked`);
  };

  async function updateTest() {
   // ToDo -> comprobar que son 15 números
    const test_3 = [4, 3, 2, 1, 5, 1, 2, 3, 4, 5, 3, 1, 4, 2, 3];

    try {
      const updates = {
        id: user.id,
        affinity2: test_3,
        updated_at: new Date(),
        test_completed: true,
      }

      let { error, returning } = await supabase.from('profiles').upsert(updates, {
        returning: 'representation', // Return the value after inserting
      })

      console.log('valor retornado: ',returning) //devuelve undefined -- Mirar
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }
  */

  const handleJoinEvent = (event, id, ode_id, free_event, price) => {
    event.preventDefault()
    if (price) {
      // go payment
      const token = 'sk_test_51K9SOrEXK2ZVYO77vOeeXfSwVwC41KvH71KGDRIY03Fzvow3wAhkSr4C2TuiKDYlmSYIAadgPbtLJc3QFeBf401X00H9ArEbXb'
      const params = new URLSearchParams({
        "price": priceId
      })

      axios.post('https://rmlnkikje1.execute-api.us-east-1.amazonaws.com/dev/checkout', params
          ,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        }).then(function(response) {
            console.log(response)
         })
    }

    async function joinFreeEvent() {
      try {
        const insert = {
          ode_id: ode_id,
          user_id: user?.id,
          evento_id: id
        }
  
        let { error, returning } = await supabase.from('bookings').insert(insert, {
          returning: 'minimal', // Return the value after inserting
        })
        
        //console.log('valor retornado: ',returning) //devuelve undefined -- Mirar
        console.log('Apuntado al evento !')
        console.log(user.id)

        // add al usuario al chat
        const username = user.id
          axios.post('https://7dno22e0xa.execute-api.us-east-1.amazonaws.com/dev/users/create', {
            username,
          })
            .then(res => {
              console.log('res', res)
              if (res.data.status) setToken(res.data.token)
              console.log('token', res.data.token)
            });

        if (error) {
          throw error
        }
      } catch (error) {
        alert(error.message)
      } finally {
      }
    
    }
  }

  console.log('Free Event', free_event)
  return(
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
            <Card>
              <CardContent>
              <Typography variant="h5" component="div">
                  {id}
              </Typography>
              <Typography variant="h5" component="div">
                  {evento}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  OdE: {ode_id}
              </Typography>
              {/*If free_event = true then Free text else paid and price*/}
                {free_event ? (
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                It is free!
              </Typography>
              ):(
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Price: {price} €
                Nos lleva a pasarela de pago
              </Typography>
              )}
              </CardContent>
                <CardActions>
                    {/*<Link href="/booking">Join Event</Link>*/}
                    <Button size="small" onClick = {(event) => handleJoinEvent(event, id, ode_id, free_event, price)}>Join this amazing Event</Button>
                </CardActions>
              </Card>
      </Grid>
    </>
  )
}

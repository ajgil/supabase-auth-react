import React, { useEffect, useState, useRef } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/Auth'
import initStripe from "stripe";
//import { GetEventos } from '../api/GetEvents'
import axios from 'axios'


export default function AllEventsCard() {

  const { user, activeEvents } = useAuth()
  const productIdRef = useRef()

  const handleJoinEvent = (event, id, ode_id, free_event, price) => {
    event.preventDefault()
    if (price) {
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
        if (error) {
          throw error
        }
      } catch (error) {
        alert(error.message)
      } finally {
      }
    }
  }

  const payment = (event_id, ode_id) => {

    async function getPriceId() {
        try {

        const { error, data } = await supabase
          .from("stripe_products_prices")
          .select("price_id")
          .eq("ode_id", ode_id)
          .eq("event_id", event_id);

        if (error) throw error;

        if (data) data.map((item) => {
          productIdRef.current = item.price_id
        })

      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
      }
    };

    // go payment
    const token = 'sk_test_51K9SOrEXK2ZVYO77vOeeXfSwVwC41KvH71KGDRIY03Fzvow3wAhkSr4C2TuiKDYlmSYIAadgPbtLJc3QFeBf401X00H9ArEbXb'
    const params = new URLSearchParams({
      "price": productIdRef.current
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
/*
   {loading ? (
          "Loading..."
        ) : activeEvents.length < 1 ? (
          <p className="text-center m-5"> Nothing to display ☹️ </p>
        ) : (
          activeEvents.map((item, index) => (
          
          ))
        )}
  */
  return(
    <>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          { activeEvents.length < 1 ? (
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  No hay eventos hiklub
                </Typography>
              </CardContent>
            </Card>
          ) : (
            activeEvents.map((item, index) => (
              <Card key={index} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {/* dato.id */}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {item.title}
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
                      {/*If free_event = true then Free text else paid and price*/}
                      {item.free_event ? (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      It is free!
                    </Typography>
                    ):(
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Price: {item.price} €
                      Nos lleva a pasarela de pago
                    </Typography>
                    )}
                </CardContent>
                <CardActions>
                    {/*<Link href="/booking">Join Event</Link>   onClick={() => joinEvent()} */}
                    {item.free_event ? (
                    <Button size="small" >Join Event</Button>
                    ):(
                    <Button size="small" color="secondary" onClick={() => payment(item.id, item.ode_id)}>Go to payment</Button>
                    )}
                </CardActions>
              </Card>
            )))}
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

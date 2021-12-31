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
import { API } from "aws-amplify"
import { loadStripe } from '@stripe/stripe-js'
//import { SetPaymentEvent } from '../../helpers/Helpers' 
import { SetPaymentSuccess } from '../checkout/OldSuccess'

export default function AllEventsCard() {

  const { user, activeEvents } = useAuth()
  const productIdRef = useRef(null)

  const stripePromise = loadStripe('pk_test_51K9SOrEXK2ZVYO77dAUljO0OOiALGlNngJy7plFyi76fTZAU2A31Gtlz1m7I45lLx6PI5s0U6klFcW9jKO0iFPh700SNRjqX17')

  /*
  const handleJoinEvent = (event, id, ode_id) => {
    event.preventDefault()
    joinFreeEvent()
  }
  */

  async function joinFreeEvent(id, ode_id) {
    try {
      const insert = {
        ode_id: ode_id,
        user_id: user?.id,
        evento_id: id
      }

      let { error } = await supabase.from('bookings').insert(insert, {
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

  async function getPriceId(id, ode_id) {
    try {
      //eventoIdRef.current = id
      //odeIdRef.current = ode_id
      //SetPaymentEvent(id, ode_id)
      SetPaymentSuccess(id, ode_id)
      //localStorage.setItem('eventoId', JSON.stringify(eventoIdRef.current))
      //localStorage.setItem('odeId', JSON.stringify(odeIdRef.current))

    const { error, data } = await supabase
      .from('stripe_products_prices').select('price_id')
      .eq("ode_id", ode_id)
      .eq("evento_id", id);
      //.single();

    if (error) throw error;

    if (data) data.map((item) => {
      productIdRef.current = item.price_id
    })

    console.log('productId',productIdRef)
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
  }
  redirectToCheckout()
};

  const redirectToCheckout = async () => {
    const fetchSession = async () => {
      const apiName = "stripeAPI"
      const apiEndpoint = "/checkout"
      const body = {
        quantity: 1,
        priceId: productIdRef.current,
      }
      const session = await API.post(apiName, apiEndpoint, { body })
      return session
    }

    const session = await fetchSession()
    const sessionId = session.id
    const stripe = await stripePromise
    stripe.redirectToCheckout({ sessionId })
  }

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
            activeEvents.map((evento, index) => (
              <Card key={index} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {/* dato.id */}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {evento.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {evento.description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        OdE: {evento.ode_id}
                    </Typography>
                    <Typography variant="body2">
                        Fecha de lanzamiento: {evento.release_date}
                        <br />
                            {/* 
                            data={item}
                            key={index.toString()}
                            dato.user_id 
                            */}
                    </Typography>
                      {/*If free_event = true then Free text else paid and price*/}
                      {evento.free_event ? (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      It is free!
                    </Typography>
                    ):(
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Price: {evento.price} €
                    </Typography>
                    )}
                </CardContent>
                <CardActions>
                    {/*<Link href="/booking">Join Event</Link>   onClick={() => joinEvent()} */}
                    {evento.free_event ? (
                    <Button size="small" onClick={() => joinFreeEvent(evento.id, evento.ode_id)}>Join Event</Button>
                    ):(
                    <Button size="small" color="secondary" onClick={() => getPriceId(evento.id, evento.ode_id)}>Go to payment</Button>
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

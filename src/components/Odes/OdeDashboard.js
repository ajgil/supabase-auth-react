// src/components/Dashboard.js
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { supabase } from "../../supabase";
import { StreamChat } from 'stream-chat';
//import { supabase } from '../../lib/supabase'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import initStripe from "stripe";
import { add } from "date-fns";
import axios from 'axios';
//import { getServiceSupabase } from "../../utils/supabase";

let chatClient;
export function OdeDashboard() {
  // Get current OdE and signOut function from context
  const { user, signOut, verifyOTP } = useAuth()
  // Una vez logado el Ode por primera vez hemos de verificar el numero teléfono

  const odephoneNumberRef = useRef()
  const tokenNumberRef = useRef()
  const userNameRef = useRef()
  const odeWebsiteRef = useRef()

  const [ode, setOde] = useState(null)

  const [title, setTitle] = useState([])
  const [item, setItem] = useState([])
  const [description, setDescription] = useState("");
  const [freeEvent, setFreeEvent] = useState(Boolean)
  const [price, setPrice] = useState("")
  const productIdRef = useRef()
  const priceIdRef = useRef()
  const eventoIdRef = useRef()
  
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const [channel, setChannel] = useState(null);
  
  const history = useHistory()

  useEffect(() => {
    if (user === null) {
      history.replace("/odelogin");
    }

    // check if is undefined or false
    if (typeof(user?.user_metadata?.ode) === 'undefined' || user?.user_metadata.ode === false) {
      const update = supabase.auth.update({data: { ode: true }})
    }

    getProfile()
    getActiveEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('user',user)
  if (user.user_metadata.ode) console.log('metadata true')
  // Verifica telefono
  async function handleVerifyOTP(e){
    e.preventDefault()

    const phone = odephoneNumberRef.current.value
    const token = tokenNumberRef.current.value
    const { error } = await verifyOTP({ phone, token })
    if (error) {
      console.log(error)
      alert('error signing with phone number')
    } else {
      // cuando se haya verificado el phone se cambia verified a true
      updateProfile({phone, verified : true })
      // Redirect odes to Dashboard
      history.push('/odes')
    }
  }
  //Obtiene el perfil - ToDo: crear un objeto y exportarlo desde el contexto auth
  async function getProfile() {
    try {

      let { data: odeProfile, error } = await supabase
        .from('odes')
        .select(`username, website, phone, verified, firstname, rol`)
        .eq('id', user?.id)
        .single()

      if (error) {
        throw error
      }
      setOde ({
        ...ode,
        ...odeProfile,
      })

    } catch (error) {
        alert(error)
    } finally {
    }
  }

  console.log('objeto user', user)
  console.log('objeto OdE', ode)

  // Actualiza perfil - ToDo: actualizar objeto exportado desde auth
  async function updateProfile(e) {
    e.preventDefault()
    const username = userNameRef.current.value
    const phone = odephoneNumberRef.current.value
    const website = odeWebsiteRef.current.value

    try {

      const updates = {
        id: user?.id,
        username: username,
        phone: phone,
        website: website,
        verified: true,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('odes').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      console.log('Ode actualizado')
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }
  // Obtiene los eventos activos del OdE
  const getActiveEvents = async () => {
    setLoading(true);
    try {

      const { error, data } = await supabase
        .from("eventos") //the table you want to work with
        .select("title, description, done,free_event, price, release_date, id") //columns to select from the database
        .eq("ode_id", user?.id) //comparison function to return only data with the user id matching the current logged in user
        .eq("done", false) //check if the done column is equal to false
        .order("id", { ascending: false }); // sort the data so the last item comes on top;

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setItem(data);
      console.log('datos eventos: ', data)

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // add new row to the database
  const addEvent = async (title, description) => {
    setAdding(true);
    //console.log(user.id)
    // Si el evento es de pago add Stripe
    try {
      const token = 'sk_test_51K9SOrEXK2ZVYO77vOeeXfSwVwC41KvH71KGDRIY03Fzvow3wAhkSr4C2TuiKDYlmSYIAadgPbtLJc3QFeBf401X00H9ArEbXb'
      if (price) {
          const params = new URLSearchParams({ name: title, description: description });
          //params.set('hello', 'world');
          axios.post('https://api.stripe.com/v1/products', params
          ,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        }).then(function(response) {
            console.log(response)
            //setProductId(response.data.id)
            productIdRef.current = response.data.id;
         })
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const priceParams = new URLSearchParams({
        "currency": "eur",
        "product": productIdRef.current,
        "unit_amount": price * 100,  // The unit amount in cents to be charged,
      })

      axios.post('https://api.stripe.com/v1/prices', priceParams
          ,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        }).then(function(response) {
            console.log(response)
            priceIdRef.current = response.data.id;
         })

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Insertar evento
      const update_eventos = {
        ode_id: user.id,
        title,
        description,
        free_event: freeEvent,
        price,
        release_date: new Date(),
      }

      //console.log('updates', updates)
      const { error, data } = await supabase
        .from("eventos")
        .insert( update_eventos ); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      // Crea chat channel con nombre ode y titulo del evento
      //await createChannel(user.id, firstname, title);

      if (data) data.map((item) => {
        eventoIdRef.current = item.id
      })
      //console.log(eventoIdRef.current)
      await getActiveEvents(); //get the new active items list

    } catch (error) {
      console.log(error)
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }

    // Actualiza tabla stripe_productos
    const update_stripe = {
      ode_id: user.id,
      evento_id: eventoIdRef.current,
      product_id: productIdRef.current,
      price_id: priceIdRef.current
    }
    //console.log(update_stripe)

    const { error } = await supabase
      .from("stripe_products_prices")
      .insert( update_stripe ); //insert an object with the key value pair, the key being the column on the table

    if (error) console.log(error) 
      alert(error.error_description || error.message);
  
  };

  // canal chat
  const createChannel = async (ode_id, firstname, title) => {
      try {                                                   // crear endpoint -> /odes/create
      const response = await fetch('https://7dno22e0xa.execute-api.us-east-1.amazonaws.com/dev/users/create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ode_id,
              firstname,
              title
            }),
          });

        const { streamUser, username, odeToken, channelId, streamApiKey } = await response.json();
        console.log(streamUser, username, odeToken, channelId, streamApiKey)
        chatClient = new StreamChat(streamApiKey);

        await chatClient.connectUser(
          {
            id: streamUser,
            name: username,
          },
          odeToken,
        );

        const channel = chatClient.channel('messaging', channelId, {
          name: `Chat with ${username}`
        });

        await channel.watch;
        setChannel(channel);

      } catch (e) {
        console.error(e, e.error);
      }

  };

  // handle de nuevo evento
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addEvent(title, description, freeEvent, price);
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setFreeEvent(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }
  if (channel) {
    return( <p> Ir al chat </p>)
  } else  {
    return (
      <>
      <div>
        <h2>Verificar Phone number </h2>
        <h5>sin esta verificacion no debemos permitir crear eventos</h5>
          <form onSubmit={handleVerifyOTP}>
            <label htmlFor="input-phone">Phone</label>
            <input id="input-phone" type="text" ref={odephoneNumberRef} />
            
            <label htmlFor="input-phone">Insert Code</label>
            <input id="input-phone" type="text" ref={tokenNumberRef}/>

            <button type="submit">Verify Token and Sign Up</button>
          </form>
      </div>
      
      <div>
        {/* Change it to display the user ID too 👇
        <h2>Datos recuperados de la tabla principal de User</h2>
        <p>Your id, {user?.id}!</p>
        <p>Your email: {user?.email}</p>
        <p>Metadatos: {user?.raw_user_meta_data}</p>
        {/*socialMediaList.map(s => (<li>{s}</li>))*/}
      </div>

      <div>
        {/* Change it to display the user ID too 👇
        <h2>Datos recuperados de la tabla principal de Odes</h2>
        <p>Usuario: {username}</p>
        <p>Phone: {phone}</p>
        <p>Website: {website}</p>
        <p>Verificado: {verified}</p>
        */}
        <form onSubmit={updateProfile}>
            <label htmlFor="input-username">username</label>
            <input id="input-phone" type="text" ref={userNameRef}/>

            <label htmlFor="input-phone">Phone</label>
            <input id="input-phone" type="text" ref={odephoneNumberRef} />

            <label htmlFor="input-website">Website</label>
            <input id="input-website" type="text" ref={odeWebsiteRef} />

            <button type="submit">Update ODE</button>
          </form>
        <p>
        </p>
      </div>

      <div>
        <h2>Mis Eventos</h2>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                { item.length < 1 ? (
                  <Card>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        No hay eventos hiklub
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  item.map((items, index) => (
                    <Card key={index} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {/* dato.id */}
                        </Typography>
                        <Typography variant="h5" component="div">
                              {items.title}
                        </Typography>
                        <Typography sx={{ fontSize: 13 }} color="text.secondary">
                              {items.description}
                        </Typography>
                        <Typography variant="body2">
                              Fecha de lanzamiento: {items.release_date}
                          <br />
                              {/* data={item} key={index.toString()} dato.user_id 
                              */}
                        </Typography>
                          {/*If free_event = true then Free text else paid and price*/}
                        {items.free_event ? (
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Gratuito
                        </Typography>
                        ):(
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Precio: {items.price} €
                        </Typography>
                        )}
                      </CardContent>
                    </Card>
                )))}
              </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        <h2>Crear un evento</h2>
        <form onSubmit={handleAddEvent}>
          <div>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new Event"
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </div>
          <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Free / Paid Event</FormLabel>
            <RadioGroup
              aria-label="price"
              name="controlled-radio-buttons-group"
              value={freeEvent}
              onChange={handleChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Free" />
              <FormControlLabel value="false" control={<Radio />} label="Paid" />
            </RadioGroup>
          </FormControl>
          { freeEvent === 'false' ? (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            {/* <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} /> */}
            <OutlinedInput
              id="outlined-adornment-amount"
              value={price}
              onChange={handleChangePrice}
              startAdornment={<InputAdornment position="start">€</InputAdornment>}
              label="Amount"
            />
          </FormControl>
          ):(
            //return null 
            <div />
          )}
          </div>
          <div>
            <button disabled={adding}>
              {adding ? "Adding.." : "Add +"}
            </button>
          </div>
        </form>
      </div>

      <div>
      <button onClick={handleSignOut}>Sign out</button>
      </div>
      </>
    )
  }
}

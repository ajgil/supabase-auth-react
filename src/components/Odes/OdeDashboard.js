// src/components/Dashboard.js
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { supabase } from "../../supabase";
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

export function OdeDashboard() {
  // Get current user and signOut function from context
  const { user, signOut, verifyOTP } = useAuth()
  // Una vez logado el Ode por primera vez hemos de verificar el numero teléfono

  const odephoneNumberRef = useRef()
  const tokenNumberRef = useRef()
  const userNameRef = useRef()
  const odeWebsiteRef = useRef()

  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [phone, setPhone] = useState(null)
  const [verified, setVerified] = useState(false)

  const [evento, setEvento] = useState([])
  const [item, setItem] = useState([])
  const [description, setDescription] = useState("");
  const [freeEvent, setFreeEvent] = useState(Boolean)
  const [price, setPrice] = useState("")
  
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  
  const history = useHistory()

  useEffect(() => {
    if (user === null) {
      history.replace("/odelogin");
    }
    getProfile()
    getActiveEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function getProfile() {
    try {

      let { data, error } = await supabase
        .from('odes')
        .select(`username, website, phone, verified`)
        .eq('id', user?.id)
        .single()

      if (error) {
        throw error
      }
      //console.log(data)
      setUsername(data.username)
      setWebsite(data.website)
      setPhone(data.phone)
      setVerified(data.verified)
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

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

  const getActiveEvents = async () => {
    setLoading(true);
    try {

      const { error, data } = await supabase
        .from("eventos") //the table you want to work with
        .select("evento, description, done, release_date, id") //columns to select from the database
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
  const addEvent = async (evento, description) => {
    setAdding(true);
    console.log(user.id)
    try {

      const updates = {
        ode_id: user.id,
        evento,
        description,
        free_event: freeEvent,
        price,
        release_date: new Date(),
      }

      const { error } = await supabase
        .from("eventos")
        .insert( updates ); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      await getActiveEvents(); //get the new active items list

    } catch (error) {
      console.log(error)
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addEvent(evento, description, freeEvent, price);
      setEvento("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setFreeEvent(event.target.value);
    console.log(freeEvent)
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
    console.log(price)
  };

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }
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
      {/* Change it to display the user ID too 👇*/}
      <h2>Datos recuperados de la tabla principal de User</h2>
      <p>Your id, {user?.id}!</p>
      <p>Your email: {user?.email}</p>
      <p>Metadatos: {user?.raw_user_meta_data}</p>
      {/*socialMediaList.map(s => (<li>{s}</li>))*/}
    </div>

    <div>
      {/* Change it to display the user ID too 👇*/}
      <h2>Datos recuperados de la tabla principal de Odes</h2>
      <p>Usuario: {username}</p>
      <p>Phone: {phone}</p>
      <p>Website: {website}</p>
      <p>Verificado: {verified}</p>
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
              <Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {/* dato.id */}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {items.evento}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="text.secondary">
                        {items.description}
                    </Typography>
                    <Typography variant="body2">
                        Fecha de lanzamiento: {items.release_date}
                    <br />
                        {/* 
                        data={item}
                        key={index.toString()}
                        dato.user_id 
                        */}
                  </Typography>
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
            name="event"
            required
            value={evento}
            onChange={(e) => setEvento(e.target.value)}
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
          <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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

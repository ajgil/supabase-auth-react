// src/components/Dashboard.js
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { supabase } from "../../supabase";
import { StreamChat } from 'stream-chat';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//import ChatOde from '../Chat/ChatOde';

let chatClient;
export function OdeDashboard() {
  // Get current OdE and signOut function from context
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
  const [firstname, setFirstname] = useState(null)

  const [title, setTitle] = useState([])
  const [item, setItem] = useState([])
  const [description, setDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const [channel, setChannel] = useState(null);
  
  const history = useHistory()

  useEffect(() => {
    if (user === null) {
      history.replace("/odelogin");
    }
    getProfile()
    getActiveEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('user',user)
  if (user.user_metadata.ode) console.log('metadata true')
  //console.log('objeto OdE', ode)
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

      let { data, error } = await supabase
        .from('odes')
        .select(`username, website, phone, verified, firstname`)
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
      setFirstname(data.firstname)
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

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
        .select("title, description, done, release_date, id") //columns to select from the database
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
  // Nuevo evento to the database + crear canal chat
  const addEvent = async (title, description) => {
    setAdding(true);
    try {

      const updates = {
        ode_id: user?.id,
        title,
        description,
        release_date: new Date(),
      }

      const { error } = await supabase
        .from("eventos")
        .insert( updates ); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      await createChannel(user.id, firstname, title);

      await getActiveEvents(); //get the new active items list

    } catch (error) {
      console.log(error)
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
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
      await addEvent(title, description);
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }
  if (channel) {
    return( <p> Ir al chat </p>)
  }else{
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
        <p>Id OdE, {user?.id}!</p>
        <p>OdE email: {user?.email}</p>
        <p>Metadatos: {user?.raw_user_meta_data}</p>
        {/*socialMediaList.map(s => (<li>{s}</li>))*/}
      </div>

      <div>
        {/* Change it to display the user ID too 👇*/}
        <h2>Datos recuperados de la tabla principal de Odes</h2>
        <p>Nombre OdE: {firstname}</p>
        <p>Usuario OdE: {username}</p>
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
                          {items.title}
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

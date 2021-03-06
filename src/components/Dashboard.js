// src/components/Dashboard.js
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { KluberOde } from '../contexts/UsersContext'
import { supabase } from '../lib/supabase'
import Avatar from './Avatar'
//import ListEventContainer from '../container/ListEventContainer'
import AllEventsCard from './Eventos/AllEventsCard'
import UserBookingsContainer from "../container/UserBookingsContainer"
import axios from 'axios'

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut, activeEvents } = useAuth()
  const { odekluber } = KluberOde()


  const [loading, setLoading] = useState(null)
  const [username, setUsername] = useState(null)
  const [full_name, setFull_name] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [provider, setProvider] = useState(null)
  const [test, setTest] = useState([0])
  const [ip, setIP] = useState(null);
  const [location, setLocation] = useState({latitude:"", longitude:""})
  const [countryCode, setCountryCode] = useState(null)
  const [countryName, setCountryName] = useState(null)
  const [mainState, setMainState] = useState(null)

  //const url = 'https://geolocation-db.com/jsonp';

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
    setLocation({...location, latitude:res.data.latitude, longitude: res.data.longitude})
    setCountryCode(res.data.country_code)
    setCountryName(res.data.country_name)
    setMainState(res.data.state)
  }

  /*
  const getDetails = async()=>{
     const response = await fetch(url);
     const details = await response.json();
     setDetails(details);
  }
  */
  
  const history = useHistory()

  useEffect(() => {
    //getProfile()
    //getData()
    //updateProperties()

  }, [])

  //console.log('eventos activos dasboard usuario', activeEvents)

  async function getProfile() {
    try {

      let { data, error } = await supabase
        .from('klubers')
        .select(`username, full_name, avatar_url, provider`)
        .eq('id', user.id)
        .single()

      if (error) {
        throw error
      }
      setUsername(data.username)
      setFull_name(data.full_name)
      setAvatarUrl(data.avatar_url)
      setProvider(data.provider)
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  async function updateProperties() {
    //console.log('esta es la ip:', ip)
    try {
      const updateProperties = {
        id: user.id,
        provider: user?.app_metadata.provider,
        avatar_url: user?.user_metadata.avatar_url,
        full_name: user?.user_metadata.full_name,
        public_ip: ip,
        location: location,
        country_code: countryCode,
        country_name: countryName,
        mainState: mainState,
        updated_at: new Date(),
      }
      let { error } = await supabase.from('profiles').upsert(updateProperties, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }
  
  async function updateProfile({ username, avatar_url }) {
    try {

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  async function updateTest() {
   // ToDo -> comprobar que son 15 n??meros
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

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }

  /*
  async function handleBookings(e) {
    e.preventDefault()

  
    if (error) {
      alert('error signing in')
      console.log(error)
    } else {
      // Redirect user to Dashboard
      history.push('/bookings')
    }
  }
  */
 console.log('Dashboard de usuario user', user)
 console.log('Dashboard de usuario kluber', odekluber)
 
  return (
    <>
    <div>
      {/* Change it to display the user ID too ????*/}
      <h2>Datos Kluber</h2>
      <p>Nombre completo: {odekluber?.full_name}</p>
      <p>Usuario: {odekluber?.username}</p>
      <p>Provider: {odekluber?.provider}</p>
      <p>Avatar: {odekluber?.avatar_url}</p>
      <p>Your id, {odekluber?.id}!</p>
      <p>Kluber email: {odekluber.email}</p>
      <p>Your phone: {odekluber?.phone}</p>
      {/* 
      <p>Welcome, {user?.user_metadata.full_name}!</p>
      <p>Provider: {user?.app_metadata.provider}</p>
      <p>Avatar: {user?.user_metadata.avatar_url}</p>
      <p>{user?.created_at}</p>
      <p>{user?.aud}</p>
      */}
    </div>
    <div>
      <h2>Actualizar perfil de usuario</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Avatar</label>
        <Avatar
            url={avatar_url}
            onUpload={url => {
              setAvatarUrl(url);
              updateProfile({ username, avatar_url: url });
            }}
          />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username })}
          //disabled={loading}
        >
          Update Profile
          {/*loading ? 'Loading ...' : 'Update' */}
        </button>
      </div>
    </div>
    
    <div>
      <h2>Test Afinidad</h2>
      <div>
        <label htmlFor="username">Pregunta 1</label>
        <input
          id="test-1"
          type="text"
          value={test || ''}
          onChange={(e) => setTest(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          //onClick={() => updateTest({ test })}
          onClick={() => updateTest()}
          disabled={loading}
        >
          Hacer test
          loading ? 'Loading ...' : 'updateTest'
        </button>
      </div>
    </div>
      <div>
        <h2>Eventos cerca de ti</h2>
        {/*<ListEventContainer />  
        <AllEventsCard />
        */}
      </div>  
    <div>
      <h2>Mis Eventos</h2>
      <h3>Accede al chat</h3>
      <UserBookingsContainer />
    </div>
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
    </>
  )
}
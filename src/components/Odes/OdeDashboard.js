// src/components/Dashboard.js
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { supabase } from "../../supabase";

export function OdeDashboard() {
  // Get current user and signOut function from context
  const { user, signOut, verifyOTP } = useAuth()
  // Una vez logado el Ode por primera vez hemos de verificar el numero teléfono

  const odephoneNumberRef = useRef()
  const tokenNumberRef = useRef()

  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [phone, setPhone] = useState(null)

  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  
  const history = useHistory()

  useEffect(() => {
    if (user === null) {
      history.replace("/login");
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
      updateProfile(phone)
      // Redirect odes to Dashboard
      history.push('/odes')
    }
  }

  async function getProfile() {
    try {

      let { data, error } = await supabase
        .from('odes_')
        .select(`username, website, phone`)
        .eq('id', user.id)
        .single()

      if (error) {
        throw error
      }
      setUsername(data.username)
      setWebsite(data.website)
      setPhone(data.phone)
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  async function updateProfile({ phoneNumber }) {
    try {

      const updates = {
        id: user.id,
        phoneNumber,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('odes_').upsert(updates, {
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

  const getActiveEvents = async () => {
    setLoading(true);
    try {

      const { error, data } = await supabase
        .from("events_") //the table you want to work with
        .select("event, done, id") //columns to select from the database
        .eq("user_id", user?.id) //comparison function to return only data with the user id matching the current logged in user
        .eq("done", false) //check if the done column is equal to false
        .order("id", { ascending: false }); // sort the data so the last item comes on top;

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setEvent(data);
      console.log('datos eventos: ', data)

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // add new row to the database
  const addEvent = async (event, description) => {
    setAdding(true);
    try {

      const { error } = await supabase
        .from("events_")
        .insert({ event, user_id: user?.id, description }); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      await getActiveEvents(); //get the new active items list

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addEvent(event, description);
      setEvent("");
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
  return (
    <>
    <div>
      <h2>Verificar Phone number </h2>
      <h5>sin esta verificacion no debemos permitir crear eventos</h5>
        <form onSubmit={handleVerifyOTP}>
          <label htmlFor="input-phone">Phone</label>
          <input 
            id="input-phone" 
            type="text" 
            ref={odephoneNumberRef} />
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
    </div>

    <div>
      {/* Change it to display the user ID too 👇*/}
      <h2>Datos recuperados de la tabla principal de Odes</h2>
      <p>ToDo - Crear tabla OdEs</p>
      <p>

      </p>
    </div>

    <div>
      <h2>Datos recuperados de la tabla de events</h2>
      <div>
        {/* event && event.length > 0 ? (
          event.map((event) => {
                event={event},
                key={id}
          })
        ) : (
          <p className="empty-events">You don't have any events created</p>
        ) */}
      </div>
    </div>

    <div>
      <h2>Crear un evento</h2>
      <form onSubmit={handleAddEvent}>
        <div>
          <input
            type="text"
            name="event"
            required
            value={event}
            onChange={(e) => setEvent(e.target.value)}
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

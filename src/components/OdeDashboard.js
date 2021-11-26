// src/components/Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { addEvent, adding } from "../api/OdeEvents";

export function OdeDashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth()

  const [event, setEvent] = useState("");
  
  const history = useHistory()

  useEffect(() => {
    if (user === null) {
      history.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addEvent(event);
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
      {/* Change it to display the user ID too 👇*/}
      <h2>Datos recuperados de la tabla principal de User</h2>
      <p>Your id, {user?.id}!</p>
      <p>Your email: {user?.email}</p>
    </div>
    
    <div>
      <h2>Datos recuperados de la tabla de events</h2>
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

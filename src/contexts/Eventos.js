// src/contexts/Events.js
import React, { createContext, useState, useEffect } from "react";
import { supabase } from '../lib/supabase'
//import { useAuth } from '../contexts/Auth'

// Initializing context
export const EventosContext = createContext();

export function EventosContextProvider({ children }) {
    const [activeEvents, setActiveEvents] = useState([]); 
    const [datos, setDatos] = useState([]);
    //const { user } = useAuth()
    const [loading, setLoading] = useState(false);
  

    const getActiveEvents = async () => {
      setLoading(true);
      try {
  
        const { error, data } = await supabase
            .from('eventos')
            .select('id, title, description, free_event, price');

        if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
        if (data) setDatos(data => {
          setActiveEvents(data);
        });
        //console.log('get active events', activeEvents)
      } catch (error) {
            console.log(error)
            alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=> {
      getActiveEvents()
    },[])

      return (
        <EventosContext.Provider
          value={{
            list:activeEvents,
            getActiveEvents
          }}
        >
          {children}
        </EventosContext.Provider>
      );
}

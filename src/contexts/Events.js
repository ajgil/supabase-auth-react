// src/contexts/Events.js
import React, { useEffect, useState } from "react";
import { supabase } from '../supabase'

export function Events() {
    const [anonEvent, setAnonEvent] = useState(""); 
    //const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getAnonEvents()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  
    const getAnonEvents = async () => {
      //setLoading(true);
      try {
  
        const { error, data } = await supabase
          .from("anon_events") //the table you want to work with
          .select('*') //columns to select from the database
          .eq("done", false) //check if the done column is equal to false
          .order("id", { ascending: false }); // sort the data so the last item comes on top;
  
        if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
        if (data) setAnonEvent(data);
        console.log('datos eventos: ', data)
  
      } catch (error) {
            console.log(error)
            alert(error.error_description || error.message);
      } finally {
        //setLoading(false);
      }
    };

    return (
      <div>
        <h3>Datos recuperados de la tabla de events</h3>
        <div>
          { anonEvent && anonEvent.length > 0 ? (
            anonEvent.map((key) => {
                  key={id}
            })
          ) : (
            <p className="empty-events">You don't have any events created</p>
          ) }
        </div>
      </div>
    )
  }
  
// src/contexts/Events.js
import React, { useEffect, useState } from "react";
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/Auth'
import { Eventos } from './Eventos'

export function AnonEvents() {
    const [anonEvent, setAnonEvent] = useState([]); 
    const [datos, setDatos] = useState([]);
    const { user } = useAuth()
    //const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (!user){
        getAnonEvents()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  
    const getAnonEvents = async () => {
      //setLoading(true);
      try {
  
        const { error, data } = await supabase
          .from("eventos") //the table you want to work with
          .select('*') //columns to select from the database
          .eq("done", false) //check if the done column is equal to false
          .order("id", { ascending: false }); // sort the data so the last item comes on top;
  
        if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
        if (data) {
          const datos = data.map(object => ({
            id: object.id,
            description: object.description,
            done: object.done,
            event: object.event
          }));
          setDatos(datos);
          setAnonEvent(datos);
          console.log('datos eventos anonimos:', datos)
        }
      } catch (error) {
            console.log(error)
            alert(error.error_description || error.message);
      } finally {
        //setLoading(false);
      }
      
    };

    if (!user){
      return (
        <div>
          <h3>Datos recuperados de la tabla de eventos anónimos</h3>
          <ul>
          {/* map over the datos array */}
              {datos.map((dato) => (
                // parent element needs to have a unique key
                <div key={dato.id}>
                  <p> {dato.id} </p>
                  <p>{dato.event}</p>
                  <p>{dato.description}</p>
                </div>
              ))}
          </ul>
            <div>
              {/* <p className="empty-events">You don't have any events created</p> */}
            </div>
        </div>
      )
    } else {
    return(
      <div>
        <Eventos />
           {/* <p className="empty-events">You don't have any events created</p> */}
      </div>
    )
    }
}
  
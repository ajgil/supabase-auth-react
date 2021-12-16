// src/contexts/Events.js
import React, { useEffect, useState } from "react";
import { supabase } from '../supabase'
import { useAuth } from '../contexts/Auth'

export function Eventos() {
    const [evento, setEvento] = useState([]); 
    const [datos, setDatos] = useState([]);
    const { user } = useAuth()
    //const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        console.log(user.id)
        getEventos()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    /*
    https://supabase.com/docs/reference/javascript/select#query-foreign-tables
        const { data, error } = await supabase
        .from('events_')
        .select(`
            id,
            supplier:supplier_id ( name ),
            purchaser:purchaser_id ( name )
        `)

        const { data, error } = await supabase
        .from('events_')
        .select(`
            id,
            user_id,
            event,
            description,
            profiles:profiles (
            id
            ),
        `)
        .from("events_, profiles:id = eq.$user.id") //the table you want to work with
                  .from("profiles", "events_") //the table you want to work with
          .select('*') //columns to select from the database
          .eq('profiles.id', user.id)
          ; // sort the data so the last item comes on top;
    */

    const getEventos = async () => {
      //setLoading(true);
      try {
  
        const { error, data } = await supabase
            .from('events_')
            .select(`
                id,
                user_id,
                event,
                description
            `);

        if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
        if (data) {
          const datos = data.map(object => ({
            id: object.id,
            user_id: object.user_id,
            event: object.event,
            description: object.description,
            release_date: object.release_date,
            done: object.done
          }));
          setDatos(datos);
          //setAnonEvent(datos);
          console.log('datos eventos:', datos)
        }
      } catch (error) {
            console.log(error)
            alert(error.error_description || error.message);
      } finally {
        //setLoading(false);
      }
    };

      return (
        <div>
          <h3>Tabla Eventos!</h3>
          <ul>
          {/* map over the datos array */}
              {datos.map((dato) => (
                // parent element needs to have a unique key
                <div key={dato.id}>
                  <p> {dato.user_id} </p>
                  <p>{dato.event}</p>
                  <p>{dato.description}</p>
                  <p>{dato.release_date}</p>
                </div>
              ))}
          </ul>
        </div>
      )
}
  
import React, { useEffect, useState } from "react";
import { supabase } from '../supabase'
import List from '../components/List'

export default function ListEventContainer() {
    const [eventdata, setEventdata] = useState([]);
    //const { user } = useAuth()

    useEffect(() => {
        getEventos()
      }, [])
  
    const getEventos = async () => {
        //setLoading(true);
        try {
            const { error, data } = await supabase
                .from('eventos')
                .select('*');
  
            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
            if (data) {
            const datos = data.map(object => ({
                id: object.id,
                ode_id: object.ode_id,
                evento: object.evento,
                description: object.description,
                release_date: object.release_date,
                done: object.done
            }));
            setEventdata(datos);
            //console.log('datos eventos:', datos)
            }
        } catch (error) {
                console.log(error)
                alert(error.error_description || error.message);
        } finally {
            //setLoading(false);
        }
    };
  
    //console.log('ListEventContainer', eventdata)
    return (
        <>
            <List eventdata={eventdata} />
        </>
    )
    
}
  
import React, { useEffect, useState } from "react";
import { supabase } from '../supabase'
//import { useAuth } from '../contexts/Auth'
import Grid from "react"
import BasicCard from '../components/Card';

export function GetEventos() {
    //const [evento, setEvento] = useState([]); 
    const [datos, setDatos] = useState([]);
    //const { user } = useAuth()
    //const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getEventos()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getEventos = async () => {
        //setLoading(true);
        try {

        const { error, data } = await supabase
            .from('events_')
            .select('*');

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
            console.log('datos eventos:', datos)
        }
        } catch (error) {
            console.log(error)
            alert(error.error_description || error.message);
        } finally {
        //setLoading(false);
        }
    };

    return(
        <>
        <Grid item xs={12} sm={6} md={4}>
            <BasicCard 
                ingrediend={"chocolate"}
                calories={100}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <BasicCard 
                ingrediend={"banana"}
                calories={40}
            />
        </Grid>
        </>
    )

}

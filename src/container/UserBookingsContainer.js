import React, { useEffect, useState } from "react";
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/Auth'
import ListBookings from '../components/Bookings/ListBookings'
//import ListUserBoooking from "../components/Bookings/ListUserBooking";

export default function UserBookingsContainer() {
    const [bookingData, setBookingData] = useState([]);
    const { user } = useAuth()

    useEffect(() => {
        getUserBookings()
      }, [])
    
    // selects 
    // select * from bookings where user_id = '725b137a-76c3-4e5a-8ced-000bdaa95bce'
    /*
    Ternary insert or update
        signIn = async (id, username) => {
        try {
            let { body } = await supabase.from('users').match({ username }).select('id, username')
            const existing = body[0]
            const { body: user } = existing?.id
                ? await supabase.from('users').update({ id, username }).match({ id }).single()
                : await supabase.from('users').insert([{ id, username }]).single()
 
        supabase
        .from("eventos")
        .select("*, eventos_usuario(*, bookings(*) )")
        .eq('id', id)
        .eq('user_id', user?.id)
        .single()
        .execute();
    */

    const getUserBookings = async () => {
        //setLoading(true);
        try {
            const { error, data } = await supabase
            .from("eventos_users_bookings")
            .select("*")
            .eq('user_id', user?.id);
  
            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
            if (data) {
            /*const datos = data.map(object => ({
                id: object.id,
                ode_id: object.ode_id,
                user_id: object.user_id,
                evento: object.evento,
                description: object.description,
                release_date: object.release_date,
                done: object.done
            }));
            */
            setBookingData(data);
            //console.log('datos eventos:', datos)
            }
        } catch (error) {
                console.log(error)
                alert(error.error_description || error.message);
        } finally {
            //setLoading(false);
        }
    };
  
    //console.log('UserBookingsContainer', bookingData)
    return (
        <>
            {/* <List bookingData={bookingData} /> */}
            <ListBookings bookingData={bookingData} />
        </>
    )
    
}
  
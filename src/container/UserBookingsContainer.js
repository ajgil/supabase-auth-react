import React, { useEffect, useState } from "react";
import { supabase } from '../supabase'
//import Bookings from '../components/Bookings'

export default function UserBookingsContainer() {
    const [bookingData, setBookingData] = useState([]);
    //const { user } = useAuth()

    useEffect(() => {
        getUserBookings()
      }, [])
    
    // selects 
    // select * from bookings where user_id = '725b137a-76c3-4e5a-8ced-000bdaa95bce'

    const getUserBookings = async () => {
        //setLoading(true);
        try {
            const { error, data } = await supabase
                .from('bookings')
                .select('*')
                .eq("user_id", user?.id);
  
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
            setBookingData(datos);
            //console.log('datos eventos:', datos)
            }
        } catch (error) {
                console.log(error)
                alert(error.error_description || error.message);
        } finally {
            //setLoading(false);
        }
    };
  
    console.log('ListEventContainer', eventdata)
    return (
        <>
            {/* <List bookingData={bookingData} /> */}
        </>
    )
    
}
  
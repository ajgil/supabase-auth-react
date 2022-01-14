import React, { useEffect } from 'react'
import { useAuth } from '../contexts/Auth'
import AllEventsCard from './AllEventsCard'

export default function MapEventos() {
    const { activeEvents } = useAuth()

    console.log('List activeEvents', activeEvents)
    // id, ode_id, title, description, free_event, price
    return (
        <>
            <h1>List datos eventos </h1>
                
            {activeEvents.map((evento, index) => {
                return <AllEventsCard key={index} id={evento.id} 
                evento={evento.title} 
                description={evento.description}
                ode_id={evento.ode_id}
                free_event={evento.free_event}
                price={evento.price}
                release_date={evento.release_date}
                />
            })}
        </>
    )
}
import React from 'react'
import EventCard from './EventCard'

export default function List({ eventdata }) {

    console.log('List eventdata', eventdata)
    return (
        <>
            <h1>List datos eventos </h1>
                
            {eventdata.map((evento, index) => {
                return <EventCard evento={evento.evento} description={evento.description}
                ode_id={evento.ode_id}/>
            })}
        </>
    )
}
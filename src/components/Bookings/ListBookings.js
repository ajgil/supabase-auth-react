import React from 'react'
import ListUserBooking from './ListUserBooking'

export default function ListBookings({ bookingData }) {

    //console.log('ListBookings', bookingData)
    return (
        <>      
            {bookingData.map((book, index) => {
                return <ListUserBooking key={index} id={book.id} evento={book.evento} description={book.description}/>
            })}
        </>
    )
}
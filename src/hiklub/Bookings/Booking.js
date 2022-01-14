import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

/**
 * Desconozco si Bookings es necesario. Por el momento añado un fichero
 * 
 */
export function Booking() {
// Get current user and signOut function from context
  const { user, signOut } = useAuth()

  // Get Event Details
  // Get Ode id and username

  let navigate = useNavigate();


  return (
    <>
    <div>
      {/* Change it to display the user ID too 👇*/}
      <h2>Datos recuperados de la tabla maestra Users</h2>
      <p>Your id, {user?.id}!</p>
      <p>Your email: {user?.email}</p>
      <p>Your phone: {user?.phone}</p>
      {/* 
      <p>Welcome, {user?.user_metadata.full_name}!</p>
      <p>Provider: {user?.app_metadata.provider}</p>
      <p>Avatar: {user?.user_metadata.avatar_url}</p>
      <p>{user?.created_at}</p>
      <p>{user?.aud}</p>
      */}
    </div>
    {/*<EventDetails /> */}
    </>
  )
}
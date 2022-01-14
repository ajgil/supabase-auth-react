// src/klubers/KlubersProfile.js
import { useState, useEffect } from 'react'
//import { useHistory, Redirect } from 'react-router-dom'
import { KluberOde } from '../../contexts/UsersContext'
import { supabase } from '../../lib/supabase'
//import Avatar from './Avatar'

export default function KluberProfile() {
  const { odekluber } = KluberOde()

  console.log('kluber', odekluber)

  useEffect(() =>{
    if (typeof(odekluber?.user_metadata?.ode === "undefined")) {
    
      console.log('unedfined true')
      const update = supabase.auth.update({data: { ode: false }})
      /*
      setUser({
        ...user,
        ...update,
      })
      */
    }

  }, [])

  return (
    <>
    <h1>Kluber profile</h1>

    </>
  )
}


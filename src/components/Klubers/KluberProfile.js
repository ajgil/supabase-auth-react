// src/klubers/KlubersProfile.js
import { useState, useEffect } from 'react'
//import { useHistory, Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { KluberOde } from '../../contexts/UsersContext'

import { supabase } from '../../supabase'
//import Avatar from './Avatar'

export default function KluberProfile() {
  const { kluber } = KluberOde()

  console.log('kluber', kluber)

  useEffect(() =>{
    if (typeof(kluber?.user_metadata?.ode === "undefined")) {
    
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
    <h1>Kluber profile</h1>
  )
}
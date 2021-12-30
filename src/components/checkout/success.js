import { useRef, useState, forwardRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
//import { AllEventsCard } from '../Eventos/AllEventsCard'
export function Success (props, ref) {
  //const odephoneNumberRef = useRef()
  //const odePhoneNumber = useParams()
  //const tokenNumberRef = useRef()
  //console.log('props', props.value)

  // Get signUp function from the auth context
  const { user } = useAuth()

  const history = useHistory()

  //AllEventsCard.joinFreeEvent()

  return <p> Payment done. Pincha aqui para seguir Hikeando </p>
}
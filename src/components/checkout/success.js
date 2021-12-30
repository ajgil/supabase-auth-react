import { useRef, useState, forwardRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
//import { AllEventsCard } from '../Eventos/AllEventsCard'

const Success = forwardRef((props , ref) => {

  console.log('Ref', ref)
  const { eventoIdRef , odeIdRef } = ref;

  //console.log('props', props.value)

  // Get signUp function from the auth context
  const { user } = useAuth()

  const history = useHistory()

  //AllEventsCard.joinFreeEvent()

  return <p> Payment done. Pincha aqui para seguir Hikeando </p>
})

export default Success
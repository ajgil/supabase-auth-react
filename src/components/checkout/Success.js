
import { useState, useEffect, useRef } from 'react'
import { useHistory   } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
//import { InsertPaymentEvent } from '../../helpers/Helpers'

const Success = () => {

  //console.log(`evento id ${evento_id} ode id ${ode_id}`)

  // Get signUp function from the auth context
  const { user } = useAuth()

  const history = useHistory()

  useEffect(() => {
    //InsertPaymentEvent()
  }, [])

  return <p> Payment done. Pincha aqui para seguir Hikeando </p>
}
export default Success
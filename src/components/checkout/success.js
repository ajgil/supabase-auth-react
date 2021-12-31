import { useState, useEffect } from 'react'
import { useHistory,   } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
//import { InsertPaymentEvent } from '../../helpers/Helpers'

const Success = () => {

  //console.log(`evento id ${evento_id} ode id ${ode_id}`)

  // Get signUp function from the auth context
  const { user } = useAuth()

  const history = useHistory()

  useEffect(() => {
    InsertPaymentEvent()
  }, [])

  return <p> Payment done. Pincha aqui para seguir Hikeando </p>
}
export default Success

export const SetPaymentSuccess = (id, ode_id) => {
        
  const [eventoId, setEventId] = useState()
  const [odeId, setOdeId] = useState()

  const eventoIdRef = useRef(null)
  const odeIdRef = useRef(null)
  eventoIdRef.current = id
  odeIdRef.current = ode_id

  //setEventId(id)
  //setOdeId(ode_id)
  
  return console.log('setPaymentEvent helpers')
}


import { useState, useEffect, useRef } from 'react'
import { useHistory   } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/Auth'
//import { InsertPaymentEvent } from '../../helpers/Helpers'

const Success = () => {

    const evento_id = localStorage.getItem('eventoId')
    const ode_id = localStorage.getItem('odeId')
    console.log(`evento id ${evento_id} ode id ${ode_id}`)

  // Get signUp function from the auth context
  const { user } = useAuth()

  //const history = useHistory()

  async function joinPaidEvent() {
      // remove all
    
    const evento_id = localStorage.getItem('eventoId')
    const ode_id = localStorage.getItem('odeId')
    //console.log(`evento id ${evento_id} ode id ${ode_id}`)
    try {
      const insert = {
        ode_id: ode_id,
        user_id: user?.id,
        evento_id: evento_id
      }

      let { error } = await supabase.from('bookings').insert(insert, {
        returning: 'minimal', // Return the value after inserting
      })
      
      //console.log('valor retornado: ',returning) //devuelve undefined -- Mirar
      console.log('Apuntado al evento de pago !')
        // remove
        localStorage.removeItem('eventoId');
        localStorage.removeItem('odeId');
       //localStorage.clear();
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
      localStorage.clear();
    } finally {
    }
  }

  useEffect(() => {
    joinPaidEvent()
  }, [])

  return <p> Payment done. Pincha aqui para seguir Hikeando </p>
}
export default Success
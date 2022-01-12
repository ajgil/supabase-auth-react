//import { eachDayOfInterval } from 'date-fns'
import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/Auth'
import { supabase } from '../lib/supabase'
/*
*   import {doSomethingWithInput, justAnAlert} from './path/to/utils.js/file'
*
*/

    export const SetPaymentEvent = (id, ode_id) => {
        
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

    export const InsertPaymentEvent = async () => {
        const { user } = useAuth()
        try {
            const insert = {
                ode_id: odeIdRef.current,
                user_id: user?.id,
                evento_id: eventoIdRef
            }

            let { error } = await supabase.from('bookings').insert(insert, {
                returning: 'minimal', // Return the value after inserting
            })
        
            console.log('Success -> Helpers -> Apuntado al evento !')
        if (error) {
            throw error
        }
        } catch (error) {
            alert(error.message)
        } finally {
        }
    }

    export const getTimeDifference = function (start, end) {
        // return difference between start and end
    }

    export const doSomethingWithInput = (theInput) => {
    //Do something with the input
    return theInput;
    }

    export const justAnAlert = () => {
    alert('hello');
    }

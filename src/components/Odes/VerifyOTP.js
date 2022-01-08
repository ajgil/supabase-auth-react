// src/components/Signup.js
import { useRef, useState, forwardRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'

export function VerifyOTP(props, ref) {
  const odephoneNumberRef = useRef()
  //const odePhoneNumber = useParams()
  const tokenNumberRef = useRef()
  console.log('props', props.value)

  // Get signUp function from the auth context
  const { verifyOTP } = useAuth()

  const navigate = useNavigate()

  async function handleVerifyOTP(e){
    e.preventDefault()

    const phone = odephoneNumberRef.current.value
    const token = tokenNumberRef.current.value
    const { error } = await verifyOTP({ phone, token })
    if (error) {
      console.log(error)
      alert('error signing with phone number')
    } else {
      // Redirect user to Dashboard
      navigate.push('/')
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleVerifyOTP}>
            <label htmlFor="input-phone">Phone</label>
            <input id="input-phone" type="text" ref={odephoneNumberRef} />

            <label htmlFor="input-phone">Insert Code</label>
            <input id="input-phone" type="text" ref={tokenNumberRef}/>
            <button type="submit">Verify Token and Sign Up</button>
        </form>
      </div>

      <div>
        {/* Add this 👇 */}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
      

    </>
  )
}
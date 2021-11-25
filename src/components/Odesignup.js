// src/components/Signup.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function OdeSignup() {
  const odeemailRef = useRef()
  const odepasswordRef = useRef()
  const odephoneNumberRef = useRef()
  const tokenNumberRef = useRef()
  
  // Get signUp function from the auth context
  const { singUpOde, signUpPhone, verifyOTP } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = odeemailRef.current.value
    const password = odepasswordRef.current.value
    const phone = odephoneNumberRef.current.value

    console.log('odeSingUp phone:', phone)
    // Calls `signUp` function from the context
    const { error } = await singUpOde({ email, password })

    if (error) {
      console.log(error)
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      history.push('/')
    }
  }

  async function handlePhoneSubmit(e){
    e.preventDefault()

    const phone = odephoneNumberRef.current.value
    console.log('phone: ', phone)
    const { error } = await signUpPhone({ phone })

    if (error) {
      console.log(error)
      alert('error signing with phone number')
    } else {
      // Redirect user to Dashboard
      history.push('/')
    }
  }

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
      history.push('/')
    }
  }

  return (
    <>
      <div>
        <h4>Register by email </h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={odeemailRef} />
          <br/>
          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={odepasswordRef} />
          <br/>
          <label htmlFor="input-phone">Teléfono</label>
          <input id="input-phone" type="text" ref={odephoneNumberRef} />
          <br />
          <button type="submit">Sign up</button>
        </form>
      </div>

      <div>
        <h4>Register by phone number</h4>
        <form onSubmit={handlePhoneSubmit}>
          <label htmlFor="input-phone">Phone</label>
          <input id="input-phone" type="text" ref={odephoneNumberRef} />
          <button type="submit">Sign up</button>
        </form>
        
        <form onSubmit={handleVerifyOTP}>
        <label htmlFor="input-phone">Insert Code</label>
          <input id="input-phone" type="text" ref={tokenNumberRef}/>
          <button type="submit">Verify Token</button>
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
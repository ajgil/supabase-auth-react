// src/components/Signup.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function OdeSignup() {
  const odeemailRef = useRef()
  const odepasswordRef = useRef()
  const odephoneNumberRef = useRef()

  // Get signUp function from the auth context
  const { signUp } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = odeemailRef.current.value
    const password = odepasswordRef.current.value
    const phone = odephoneNumberRef.current.value

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password })

    if (error) {
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      history.push('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={odeemailRef} />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={odepasswordRef} />

          <label htmlFor="input-password">Teléfono</label>
          <input id="input-phoneNumber" type="phoneNumber" ref={odephoneNumberRef} />

        <br />

        {/* Add this 👇 */}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <button type="submit">Sign up</button>
      </form>
    </>
  )
}
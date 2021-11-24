// src/components/Login.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const phoneNumberRef = useRef()

  // Get signUp function from the auth context
  const { signIn } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      history.push('/')
    }
  }

  return (
    <>
      <div>
      <h2>Login & Registro Usuarios</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="input-email">Email</label>
            <input id="input-email" type="email" ref={emailRef} />

            <label htmlFor="input-password">Password</label>
            <input id="input-password" type="password" ref={passwordRef} />
            <br />
            <br />
            <button type="submit">Login</button>
          </form>
          <br />
                  {/* Add this 👇 */}
          <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
      </div>

      <div>
        <h2>Login & Registro OdE</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={emailRef} />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={passwordRef} />

          <label htmlFor="input-password">Teléfono</label>
          <input id="input-phoneNumber" type="phoneNumber" ref={phoneNumberRef} />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  )
}
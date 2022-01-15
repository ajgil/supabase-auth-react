// src/components/Login.js
import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()


  // Get signUp function from the auth context
  const { signIn } = useAuth()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(password)
    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
      console.log(error)
    } else {
      // Redirect user to Dashboard
      navigate.push('/')
    }
  }

  /*
  async function handleSubmitOde(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(password)
    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
      console.log(error)
    } else {
      // Redirect user to Dashboard
      navigate.push('/ode')
    }
  }
  */

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
    </>
  )
}
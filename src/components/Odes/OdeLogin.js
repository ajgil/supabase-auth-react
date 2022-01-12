// src/components/Login.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'

export function OdeLogin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  //const phoneRef = useRef()

  // Get signUp function from the auth context
  const { signIn } = useAuth()

  const history = useHistory()

  async function handleSubmitOde(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value
    //const phone = phoneRef.current.value

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
      console.log(error)
    } else {
      // Redirect user to Dashboard
      history.push('/odes')
    }
  }

  return (
    <>
      <div>
        <h2>Login & Registro OdE</h2>
        <form onSubmit={handleSubmitOde}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={emailRef} />

          {/* 
            <label htmlFor="input-text">Phone</label>
            <input id="input-text" type="text" ref={phoneRef} />
          */}


          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={passwordRef} />

          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Todavía no estás registrado? Crea una cuenta OdE <Link to="/odesignup">Registrate como OdE</Link>
        </p>
      </div>
    </>
  )
}
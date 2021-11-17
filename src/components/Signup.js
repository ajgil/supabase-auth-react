// src/components/Signup.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()

  // Get signUp function from the auth context
  const { signUp, signInWithFacebook, signInWithGoogle } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

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
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        {/* Add this 👇 */}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <button type="submit">Sign up</button>
      </form>
      <div className="App">
      <h1>Social SingUp!</h1>
      <h3>Google</h3>
      <button onClick={signInWithGoogle}>Sign In</button>
      </div>
      <div className="App">
      <h3>Facebook</h3>
      <button onClick={signInWithFacebook}>Sign In</button>
      </div>
    </>
  )
}
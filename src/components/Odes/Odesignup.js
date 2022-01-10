// src/components/Signup.js
import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { supabase } from '../../supabase'

export function OdeSignup() {
  const odeemailRef = useRef()
  const odepasswordRef = useRef()
  const odephoneNumberRef = useRef()
  const odenameRef = useRef()
  const tokenNumberRef = useRef()
  const otpShow = useRef(false)
  
  // Get signUp function from the auth context
  const { signUpPhone } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = odeemailRef.current.value
    const password = odepasswordRef.current.value
    const phone = odephoneNumberRef.current.value

    //console.log('odeSingUp pass:', password)
    // Calls `signUp` function from the context
    //const { error } = await singUpOde({ email, password })
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      },{
          data:{
              ode: true
          }
      })

    if (error) {
      console.log(error)
      alert('error signing in')
    } else {
      // Redirect user to OdeDashboard
      history.push('/odes')
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
      console.log('add code token')
      // Redirect user to Dashboard
      history.push('/verify')
      alert('Proporciona el token recibido por SMS')
      //handleVerifyOTP
    }
  }

  return (
    <>
      <div>
        <h4>Register by email </h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor='input-name'>Nombre</label>
          <input id="input-email" type="email" ref={odenameRef} />
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email"ref={odeemailRef} />
          <br/>
          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={odepasswordRef} />
          <br/>
          <label htmlFor="input-phone">Teléfono</label>
          <input id="input-phone" type="text" ref={odephoneNumberRef} />
          <br />
          {!otpShow ? <h3>Enter your Phone Number</h3> : <h3>Enter the OTP</h3> }
          {otpShow ? <p>A One Time Password has been sent to your phone number for verification puposes.</p> : null}
          <button type="submit">Sign up</button>

         {/* {!otpShow ? <div>
                      <div>
                      <TextField id="code" label="Code" color="secondary" value={code} onChange={e => {setState({code: e.target.value});}}/>
                      
                      https://medium.com/swlh/creating-phone-number-verification-component-using-react-js-and-twilio-services-6a635657ecc9
                      
                      </div>
                      </div>
                      */}
                      
        </form>
      </div>

      <div>
        {/* Add this 👇 */}
        <p>
          Already have an account? <Link to="/odelogin">Log In</Link>
        </p>
      </div>
      

    </>
  )
}
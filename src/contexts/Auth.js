import { eachDayOfInterval } from 'date-fns'
import React, { useContext, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { supabase } from '../supabase'
//import axios from "axios"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      // Check active sessions and sets the user
      const session = supabase.auth.session()
  
      setUser(session?.user ?? null)
      setLoading(false)
  
      // Listen for changes on auth state (logged in, signed out, etc.)
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )
      return () => {
        listener?.unsubscribe()
      }

    }, [])

    const value = {
      // Kluber SingUp
      signUpKluber: (data) => supabase.auth.signUp({
        data
      },{
        data: { ode: false }
      }),
        
      //OdEs SingUp methods
      singUpOde: (data) => supabase.auth.signUp({
          data
        },{
          data:{
            ode: true
          }
      }),

      signUpPhone: (data) => supabase.auth.signIn(data),
      verifyOTP: (data) => supabase.auth.verifyOTP(data),
      
      //Login --> supabase.auth.signIn({ email, password })
      signIn: (data) => supabase.auth.signIn(data),

      signOut: () => supabase.auth.signOut(),
	    
      // https://github.com/supabase/supabase/discussions/2842
      // http://localhost:3000/#
      // redirectTo: 'http://localhost:3000/provider?refresh=true'
      signInWithGoogle: () => {
		    const { error } = supabase.auth.signIn(
            {
              provider: 'google'
            },
            { redirectTo: 'http://localhost:3000/provider?refresh=true' }
          )
          if (error) {
            alert(error.message);
          }
        },

      signInWithFacebook: () => {
        const {error } = supabase.auth.signIn(
          {
            provider: 'facebook'
          },
            { redirectTo: 'http://localhost:3000/provider?refresh=true' }
          )
          if (error) {
            console.log(error)
            //alert(error.message);
          }
        },
  
      user,
    }
    //console.log('auth user : ', user?.email)
    //console.log(user?.app_metadata.provider)
    //console.log(user?.user_metadata.avatar_url)
    //user?.user_metadata.full_name
    // redirectTo: 'http://localhost:3000'

    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }

  export function useAuth() {
    return useContext(AuthContext)
  }
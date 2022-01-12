import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
//import axios from "axios"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(supabase.auth.user())
  const [odeProfile, setOdeProfile ] = useState('null')
  const [userProfile, setUserProfile ] = useState('null')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {

        if (sessionUser.user_metadata.ode) {

          const { data: OdeProfile } = await supabase
            .from("odes")
            .select("*")
            .eq("id", sessionUser.id)
            .single();

          setUser({
            ...sessionUser,
            ...OdeProfile,
          });

        } else {
          const { data: UserProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", sessionUser.id)
            .single();

            setUser({
            ...sessionUser,
            ...UserProfile,
          });

        }
        setLoading(false);
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });

  }, [])
  
    // Will be passed down to Signup, Login and Dashboard components
    /*
    singUpOde: (datos) => supabase.auth.signUp({
        datos,
        data: { ode: true }
      }),
    
      const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    },{
        data:{
            phone: phone,
            name: name,
            company: company
        }
    })
      
    
    */

    const value = {
      // User SingUp
      signUp: (data) => supabase.auth.signUp(data),
        
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
      loading
    }
    //console.log('auth user : ', user?.email)
    //console.log(user?.app_metadata.provider)
    //console.log(user?.user_metadata.avatar_url)
    //user?.user_metadata.full_name
    // redirectTo: 'http://localhost:3000'

    return (
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    )
  }

  export function useAuth() {
    return useContext(AuthContext)
  }
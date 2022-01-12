//import { eachDayOfInterval } from 'date-fns'
import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import axios from "axios"

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [activeEvents, setActiveEvents] = useState([]); 
    //const [loading, setLoading] = useState(false);
  
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
    
    const getActiveEvents = async () => {
      setLoading(true);
      try {
  
        const { error, data } = await supabase
            .from('eventos')
            .select('id, ode_id, title, description, release_date, free_event, price');

        if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
  
        if (data) setActiveEvents(data)
        //console.log('Context auth getActiveEvents function', activeEvents)
      } catch (error) {
            console.log(error)
            alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=> {
      getActiveEvents()
    },[])


    /*
    // Para crear cookies
    useEffect(() => {
      axios.post("/api/set-supabase-cookie", {
        event: user ? "SIGNED_IN" : "SIGNED_OUT",
        session: supabase.auth.session(),
      });
    }, [user]);

    // Will be passed down to Signup, Login and Dashboard components

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
      // Eventos
      activeEvents,

      // Usuarios y OdEs
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
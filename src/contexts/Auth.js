import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'
import axios from "axios"

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
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      signInWithGoogle: () => supabase.auth.signIn({
          provider: 'google'
        }, {
          scopes: 'profile'
        }),
      signInWithFacebook: () => supabase.auth.signIn({provider: 'facebook'}),
      user,
      //resApi: () => userApi(provider),
    }
    //console.log('auth user : ', user?.email)
    //console.log(user?.app_metadata.provider)
    //console.log(user?.user_metadata.avatar_url)
    //user?.user_metadata.full_name
    // redirectTo: 'http://localhost:3000'

    // backend connect 
    
    const headers = {
      'Content-Type': 'application/json',
    }
    
    const http = axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true,
    })

    const userApi = ({ apiUser}) => {
      return http
        .post("/api/v1/users/register", { apiUser}, headers)
        .then(data => { 
          console.log('respuesta:', data)
        })  
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }

  export function useAuth() {
    return useContext(AuthContext)
  }
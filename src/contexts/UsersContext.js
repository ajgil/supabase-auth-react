import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const KluberOdeContext = React.createContext()

export function KluberOdeProvider({ children }) {
  const [ode, setOde ] = useState('null')
  const [kluber, setKluber ] = useState('null')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getUserProfile = async () => {
      const session = supabase.auth.user();

      if (session) {
        const { data: OdeProfile } = await supabase
            .from("odes")
            .select("*")
            .eq("id", session.id)
            .single();

          setOde({
            ...OdeProfile,
          });

          const { data: kluberProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.id)
            .single();

            setKluber({
              ...kluberProfile,
            });
        }
        setLoading(false);
      }

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });

  }, [])

  //console.log('objeto kluber', kluber)
  //console.log('objeto ode', ode)
  
    const value = {
      ode,
      kluber,
      loading
    }

    return (
      <KluberOdeContext.Provider value={value}>
        {!loading && children}
      </KluberOdeContext.Provider>
    )
  }

export function KluberOde() {
  return useContext(KluberOdeContext)
}
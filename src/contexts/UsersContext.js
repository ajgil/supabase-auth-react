import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const KluberOdeContext = React.createContext()

export function KluberOdeProvider({ children }) {
  const [odekluber, setOdeKluber ] = useState('null')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getUserProfile = async () => {
      const session = supabase.auth.user();

      if (session) {
        const { data: profile } = await supabase
            .from("klubers")
            .select("*")
            .eq("id", session.id)
            .single();

          // si ode -> objeto ode
            setOdeKluber({
              ...profile,
            });

        }
        setLoading(false);
      }

    getUserProfile();

    console.log(odekluber)
    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });

  }, [])

  //console.log('objeto kluber', kluber)
  //console.log('objeto ode', ode)
  
    const value = {
      odekluber,
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
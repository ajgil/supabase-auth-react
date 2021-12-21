// src/supabase.js

//https://dev.to/dabit3/10-minute-tutorial-full-stack-github-authentication-with-supabase-react-3c6b
// https://supabase.io/docs/guides/examples
//https://ruanmartinelli.com/posts/supabase-authentication-react


// Supabase JWT Secret 
// Used to decode your JWTs You can also use this to mint your own JWTs
// a6bc41f9-a1a7-4278-932c-938dcfaab1af
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
)

export { supabase }
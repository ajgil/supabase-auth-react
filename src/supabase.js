// src/supabase.js

//https://dev.to/dabit3/10-minute-tutorial-full-stack-github-authentication-with-supabase-react-3c6b
// https://supabase.io/docs/guides/examples
//https://ruanmartinelli.com/posts/supabase-authentication-react

//  https://supabase.io/docs/learn/auth-deep-dive/auth-google-oauth
// https://supabase.io/docs/guides/auth/auth-google


import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
)

export { supabase }
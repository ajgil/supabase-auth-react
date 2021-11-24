// src/components/Dashboard.js
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { supabase } from '../supabase'
import Avatar from './Avatar'

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth()

  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const history = useHistory()

  useEffect(() => {
    getProfile()

  }, [])

  async function getProfile() {
    try {

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        throw error
      }
      setUsername(data.username)
      setWebsite(data.website)
      setAvatarUrl(data.avatar_url)
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }
  return (
    <>
    <div className="form-widget">
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url })
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatar_url })}
          //disabled={loading}
        >
          Update
          {/*loading ? 'Loading ...' : 'Update' */}
        </button>
      </div>

    </div>
    <div>
      {/* Change it to display the user ID too 👇*/}
      <h2>Datos recuperados de la tabla Auth</h2>
      <p>Welcome, {user?.user_metadata.full_name}!</p>
      <p>Your id, {user?.id}!</p>
      <p>Your email: {user?.email}</p>
      <p>{user?.created_at}</p>
      <p>{user?.aud}</p>
      <p>Provider: {user?.app_metadata.provider}</p>
      <p>Avatar: {user?.user_metadata.avatar_url}</p>

    </div>
    <div>
      <h2>Datos recuperados de la tabla de perfiles</h2>
      <p>Usuario: {username}</p>
      <p>Website: {website}</p>
      <p>Avatar: {avatar_url}</p>
      
      <button onClick={handleSignOut}>Sign out</button>
    </div>
    </>
  )
}
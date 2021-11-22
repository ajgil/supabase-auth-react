// src/components/Dashboard.js
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth()

  const history = useHistory()

  async function handleSignOut() {
    // Ends user session
    await signOut()

    // Redirects the user to Login page
    history.push('/login')
  }
  return (
    <div>
      {/* Change it to display the user ID too 👇*/}
      <p>Welcome, {user?.user_metadata.full_name}!</p>
      <p>Your id, {user?.id}!</p>
      <p>Your email: {user?.email}</p>
      <p>{user?.created_at}</p>
      <p>{user?.aud}</p>
      <p>{user?.app_metadata.provider}</p>
      <p>{user?.user_metadata.avatar_url}</p>

      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}
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
      <p>Welcome, {user?.id}!</p>
      <p>{user?.email}</p>
      <p>{user?.created_at}</p>

      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}
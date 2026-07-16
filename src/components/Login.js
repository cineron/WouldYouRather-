import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import '../App.css'

// 🎭 This is our "fake" login -- no passwords, just pick who you want to be
// for the day! Real auth is way out of scope for this project.
function Login() {
  const users = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.authedUser)
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedUser, setSelectedUser] = useState('')

  // Already logged in? No need to be here, scoot back to the home page. 👋
  if (authedUser) {
    return <Redirect to="/" />
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!selectedUser) return

    dispatch(setAuthedUser(selectedUser))
    history.push('/') // 🏠 off to the home page we go
  }

  const userIds = Object.keys(users)

  return (
    <div className="login">
      <h1>Would You Rather?</h1>
      <p>Who's asking? Pick a user to "log in" as. 🕵️</p>

      <form onSubmit={handleSubmit}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="" disabled>
            -- choose a user --
          </option>
          {/* Mapping straight over whatever's in state.users, so any user
              we add to our mock data (hi, ronwilson! 👋) shows up here too. */}
          {userIds.map((id) => (
            <option key={id} value={id}>
              {users[id].name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!selectedUser}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

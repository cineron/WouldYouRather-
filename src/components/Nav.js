import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import '../App.css'

// 🧭 Shows up on every single page -- App.js renders this above the
// <Switch>, outside of any <Route>, so it never disappears on navigation.
// NavLink (instead of a plain Link) tacks on an "active" class automatically
// the moment its `to` path matches the current URL. 🎯
function Nav() {
  const authedUser = useSelector((state) => state.authedUser)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const currentUser = authedUser ? users[authedUser] : null

  // Logging out is simple -- just wipe authedUser back to null. No token
  // to invalidate, no session to destroy, just a plain reducer reset. 🔌
  function handleLogout() {
    dispatch(setAuthedUser(null))
  }

  return (
    <nav className="nav">
      <div className="nav-links">
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/add" activeClassName="active">
          New Question
        </NavLink>
        <NavLink to="/leaderboard" activeClassName="active">
          Leaderboard
        </NavLink>
      </div>

      {/* A signed-in user gets a little identity badge over on the right,
          plus a way out. 👋 */}
      {currentUser && (
        <div className="nav-user">
          <img
            className="nav-user-avatar"
            src={currentUser.avatarURL}
            alt={currentUser.name}
          />
          <span className="nav-user-name">{currentUser.name}</span>
          <button className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Nav

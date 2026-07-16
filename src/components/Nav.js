import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

// 🧭 Shows up on every single page -- App.js renders this above the
// <Switch>, outside of any <Route>, so it never disappears on navigation.
// NavLink (instead of a plain Link) tacks on an "active" class automatically
// the moment its `to` path matches the current URL. 🎯
function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/add" activeClassName="active">
        New Question
      </NavLink>
      <NavLink to="/leaderboard" activeClassName="active">
        Leaderboard
      </NavLink>
    </nav>
  )
}

export default Nav

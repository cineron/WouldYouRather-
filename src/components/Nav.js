import React from 'react'
import { Link } from 'react-router-dom'

// 🧭 Shows up on every single page -- App.js renders this above the
// <Switch>, outside of any <Route>, so it never disappears on navigation.
function Nav() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/add">New Question</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  )
}

export default Nav

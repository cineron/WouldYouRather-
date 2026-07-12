import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

// 🏠 Wraps everything in <Router> so we get client-side routing, and
// renders <Nav> up top so it's on every page. The <Switch> below only
// ever renders ONE matching route at a time.
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Switch>
          {/* 🔓 /login is the one page anybody can see, logged in or not */}
          <Route path="/login" component={Login} />

          {/* 🔒 Everything below here needs an authedUser, courtesy of
              ProtectedRoute. These are just stand-ins for now -- real
              pages are coming in the next phase! */}
          <ProtectedRoute exact path="/">
            <h2>Home 🏠 (Unanswered / Answered questions coming soon!)</h2>
          </ProtectedRoute>

          <ProtectedRoute path="/add">
            <h2>New Question form ✍️ coming soon!</h2>
          </ProtectedRoute>

          <ProtectedRoute path="/leaderboard">
            <h2>Leaderboard 🏆 coming soon!</h2>
          </ProtectedRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App

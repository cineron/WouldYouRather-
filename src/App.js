import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Login from './components/Login'
import Home from './components/Home'
import QuestionPage from './components/QuestionPage'
import ProtectedRoute from './components/ProtectedRoute'
import { handleInitialData } from './actions/shared'

// 🏠 Wraps everything in <Router> so we get client-side routing, and
// renders <Nav> up top so it's on every page. The <Switch> below only
// ever renders ONE matching route at a time.
function App() {
  const dispatch = useDispatch()

  // 📡 Go fetch our users & questions from the "backend" as soon as the
  // app mounts. Empty dependency array = run this once and never again
  // (otherwise we'd be fetching in an infinite loop, yikes 😅).
  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Nav />

        <Switch>
          {/* 🔓 /login is the one page anybody can see, logged in or not */}
          <Route path="/login" component={Login} />

          {/* 🔒 Everything below here needs an authedUser, courtesy of
              ProtectedRoute. The other two are still stand-ins for now --
              real pages are coming in the next phase! */}
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>

          <ProtectedRoute path="/add">
            <h2>New Question form ✍️ coming soon!</h2>
          </ProtectedRoute>

          <ProtectedRoute path="/leaderboard">
            <h2>Leaderboard 🏆 coming soon!</h2>
          </ProtectedRoute>

          {/* This one passes a component instead of children, so
              QuestionPage gets match.params off the URL. 🔗 */}
          <ProtectedRoute
            exact
            path="/questions/:question_id"
            component={QuestionPage}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App

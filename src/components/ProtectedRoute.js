import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// 🔒 A little bouncer that stands in front of a <Route>. Got an authedUser?
// Come on in. Nope? Straight to /login with you.
function ProtectedRoute({ children, ...rest }) {
  const authedUser = useSelector((state) => state.authedUser)

  return (
    <Route
      {...rest}
      render={() => (authedUser ? children : <Redirect to="/login" />)}
    />
  )
}

export default ProtectedRoute

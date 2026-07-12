import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// 🔒 A bouncer standing in front of a <Route>. An authedUser gets waved
// through -- otherwise, straight to /login.
function ProtectedRoute({ children, component: Component, ...rest }) {
  const authedUser = useSelector((state) => state.authedUser)

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (!authedUser) {
          return <Redirect to="/login" />
        }

        // Two supported patterns: a component (gets match/location/etc. as
        // props -- handy for reading URL params) or plain pre-built children.
        return Component ? <Component {...routeProps} /> : children
      }}
    />
  )
}

export default ProtectedRoute

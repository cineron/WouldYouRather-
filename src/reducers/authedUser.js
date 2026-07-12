import { SET_AUTHED_USER } from '../actions/authedUser'

// 🔒 Starts as null -- nobody's "logged in" until Login.js says otherwise.
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    default:
      return state
  }
}

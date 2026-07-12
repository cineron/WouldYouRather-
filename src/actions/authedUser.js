// 🪪 Whoever "logs in" (aka picks their name from a dropdown, since this
// is a fake auth system) becomes the authedUser. We just store their id
// string -- easy to look up the full user object in state.users later.
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

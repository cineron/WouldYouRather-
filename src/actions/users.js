// 🧑‍🤝‍🧑 Action type for adding the users object into the store.
export const RECEIVE_USERS = 'RECEIVE_USERS'

// hands users object to the reducer.
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

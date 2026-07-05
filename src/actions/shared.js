import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

// 🚀 This is the "go fetch everything" thunk. Redux-thunk 
// returns a function instead of a plain action object, which is the magic
// that lets us do async stuff (like waiting on our fake API) before we
// actually dispatch anything.
//
// Promise.all fires both requests at once ⏱️ (no reason to make the user
// wait for users AND THEN questions one after another), and once they're
// both back, we dispatch two  actions to put the data in the store.
export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
      }
    )
  }
}

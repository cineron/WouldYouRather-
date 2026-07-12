import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'
import authedUser from './authedUser'

// 🍱 combineReducers bundles reducers into one,
// so the store looks like { users: {...}, questions: {...}, authedUser: 'someId' }.
export default combineReducers({
  users,
  questions,
  authedUser,
})

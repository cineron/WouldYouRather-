import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'

// 🍱 combineReducers bundles reducers into one,
// so the store lookslike { users: {...}, questions: {...} }.
export default combineReducers({
  users,
  questions,
})

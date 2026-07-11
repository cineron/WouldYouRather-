import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/questions'

// 🗄️ Starts empty because we don't have any users until handleInitialData
// does its thing. Classic switch-case reducer, nothing fancy here.
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      // Spread the incoming users right on top of whatever we had. 🧩
      return {
        ...state,
        ...action.users,
      }

    case ADD_QUESTION:
      // A new poll needs to get tacked onto its author's questions list. ✍️
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([
            action.question.id,
          ]),
        },
      }

    case ADD_QUESTION_ANSWER:
      // Somebody answered a poll, so log it under their name. ✅
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      }

    default:
      // 🤷 Not an action we care about — hand state back untouched.
      return state
  }
}

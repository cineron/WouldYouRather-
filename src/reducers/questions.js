import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_QUESTION_ANSWER,
} from '../actions/questions'

// 📋 Same as users reducer — empty to start.
export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }

    case ADD_QUESTION:
      // Slot the new question in by its id. 🆕
      return {
        ...state,
        [action.question.id]: action.question,
      }

    case ADD_QUESTION_ANSWER:
      // Rock the vote! 🗳️ Add the voter's name to the votes array for
      // whichever option (optionOne/optionTwo) they picked.
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      }

    default:
      return state
  }
}

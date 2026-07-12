import { _saveQuestionAnswer } from '../utils/_DATA'

// ❓ Action types for everything question-related.
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

// Dumps the whole questions object into the store. 📥
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

// A new poll. 🐣 Send it to the reducer.
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

// Someone voted! 🗳️ authedUser picked either optionOne or optionTwo on qid.
export function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

// 📮 A thunk for casting a vote. The mock "backend" gets the answer first,
// and only after that resolves does the plain addQuestionAnswer action get
// dispatched -- which is what actually updates the questions and users
// slices of the store.
export function handleAnswerQuestion(info) {
  return (dispatch) => {
    return _saveQuestionAnswer(info).then(() => {
      dispatch(addQuestionAnswer(info))
    })
  }
}

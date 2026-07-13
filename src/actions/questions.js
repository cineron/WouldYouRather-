import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

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

// 🐣 A thunk for creating a brand new poll. getState() grabs authedUser
// off the store, since a question needs to know who's asking. Once the
// mock "backend" hands back the fully-formatted question (with its own
// generated id and timestamp), a single addQuestion dispatch is enough --
// both the questions reducer and the users reducer already know how to
// react to ADD_QUESTION.
export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return _saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    }).then((question) => {
      dispatch(addQuestion(question))
    })
  }
}

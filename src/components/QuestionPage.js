import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import '../App.css'

// The full poll page. Both the "cast a vote" form and the "see the
// results" view live right here, depending on whether authedUser has
// already answered this particular question. 🗳️
function QuestionPage(props) {
  const questionId = props.match.params.question_id
  const dispatch = useDispatch()

  const question = useSelector((state) => state.questions[questionId])
  const authedUser = useSelector((state) => state.authedUser)
  const author = useSelector((state) =>
    question ? state.users[question.author] : null
  )
  const existingAnswer = useSelector((state) => {
    const currentUser = state.users[authedUser]
    return currentUser ? currentUser.answers[questionId] : undefined
  })

  const [selectedOption, setSelectedOption] = useState('')

  // No question in the store matches that id -- a classic 404 situation. 🚫
  if (!question) {
    return (
      <div className="question-page-404">
        <h2>404 - Not Found</h2>
        <p>That poll doesn't seem to exist.</p>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!selectedOption) return

    dispatch(
      handleAnswerQuestion({
        authedUser,
        qid: questionId,
        answer: selectedOption,
      })
    )
  }

  // Already voted? Results view instead of the form. 📊
  if (existingAnswer) {
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes

    // A guard against dividing by zero, just in case. ➗
    const optionOnePercent = totalVotes
      ? Math.round((optionOneVotes / totalVotes) * 100)
      : 0
    const optionTwoPercent = totalVotes
      ? Math.round((optionTwoVotes / totalVotes) * 100)
      : 0

    return (
      <div className="question-page">
        <h2>Would You Rather</h2>
        <p className="question-page-author">
          <img
            className="question-page-avatar"
            src={author.avatarURL}
            alt={author.name}
          />
          {author.name} asks:
        </p>

        <div
          className={
            existingAnswer === 'optionOne'
              ? 'question-option selected'
              : 'question-option'
          }
        >
          <p>{question.optionOne.text}</p>
          <p>
            {optionOneVotes} votes ({optionOnePercent}%)
          </p>
          {/* A little visual bar to go with that percentage. 📊 */}
          <div className="vote-bar">
            <div
              className="vote-bar-fill"
              style={{ width: `${optionOnePercent}%` }}
            />
          </div>
          {/* A badge marking the actual pick made. ✅ */}
          {existingAnswer === 'optionOne' && <p>Selected answer</p>}
        </div>

        <div
          className={
            existingAnswer === 'optionTwo'
              ? 'question-option selected'
              : 'question-option'
          }
        >
          <p>{question.optionTwo.text}</p>
          <p>
            {optionTwoVotes} votes ({optionTwoPercent}%)
          </p>
          <div className="vote-bar">
            <div
              className="vote-bar-fill"
              style={{ width: `${optionTwoPercent}%` }}
            />
          </div>
          {existingAnswer === 'optionTwo' && <p>Selected answer</p>}
        </div>
      </div>
    )
  }

  // Not voted yet -- time for the form. ✍️
  return (
    <div className="question-page">
      <h2>Would You Rather</h2>
      <p className="question-page-author">
        <img
          className="question-page-avatar"
          src={author.avatarURL}
          alt={author.name}
        />
        {author.name} asks:
      </p>

      <form onSubmit={handleSubmit}>
        {/* Reusing the "selected" class from the results view above --
            same visual treatment, just driven by local state instead. 🖱️ */}
        <label
          className={
            selectedOption === 'optionOne'
              ? 'question-option selected'
              : 'question-option'
          }
        >
          <input
            type="radio"
            name="option"
            value="optionOne"
            checked={selectedOption === 'optionOne'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {question.optionOne.text}
        </label>

        <label
          className={
            selectedOption === 'optionTwo'
              ? 'question-option selected'
              : 'question-option'
          }
        >
          <input
            type="radio"
            name="option"
            value="optionTwo"
            checked={selectedOption === 'optionTwo'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          {question.optionTwo.text}
        </label>

        <button type="submit" disabled={!selectedOption}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default QuestionPage

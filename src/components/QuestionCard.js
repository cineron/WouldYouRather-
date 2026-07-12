import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// A reusable card for a single question. 🎴 Only an id is needed as a prop --
// the question and its author both come straight from the store.
function QuestionCard({ id }) {
  const question = useSelector((state) => state.questions[id])
  const author = useSelector((state) => state.users[question.author])

  return (
    <div className="question-card">
      <img
        className="question-card-avatar"
        src={author.avatarURL}
        alt={author.name}
      />
      <div className="question-card-body">
        <p className="question-card-author">{author.name} asks:</p>
        {/* A teaser snippet only -- the full two-option showdown lives on
            the poll's own details page. 👀 */}
        <p className="question-card-snippet">
          Would rather... {question.optionOne.text}?
        </p>
        <Link to={`/questions/${id}`} className="question-card-link">
          View Poll
        </Link>
      </div>
    </div>
  )
}

export default QuestionCard

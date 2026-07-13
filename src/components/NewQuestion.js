import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

// A plain form for asking a brand new "would rather" question. Two text
// inputs, one for each option -- nothing fancier than that needed here. 📝
function NewQuestion() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [optionOneText, setOptionOneText] = useState('')
  const [optionTwoText, setOptionTwoText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!optionOneText || !optionTwoText) return

    // Wait for the save to finish, then head back to the home page --
    // this way the new question is already sitting in the store by the
    // time the dashboard renders. 🏠
    dispatch(handleAddQuestion(optionOneText, optionTwoText)).then(() => {
      history.push('/')
    })
  }

  return (
    <div className="new-question">
      <h2>Would You Rather</h2>
      <p>Time to cook up a brand new poll. 🍳</p>

      <form onSubmit={handleSubmit}>
        <label>
          Option One
          <input
            type="text"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
          />
        </label>

        <label>
          Option Two
          <input
            type="text"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
          />
        </label>

        <button type="submit" disabled={!optionOneText || !optionTwoText}>
          Submit Question
        </button>
      </form>
    </div>
  )
}

export default NewQuestion

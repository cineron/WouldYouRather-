import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import QuestionCard from './QuestionCard'
import '../App.css'

// The dashboard. 🏠 Every question gets sorted into one of two buckets --
// answered or unanswered -- based on whether authedUser's answers object
// has an entry for that question's id.
function Home() {
  const questions = useSelector((state) => state.questions)
  const users = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.authedUser)

  // A plain UI toggle, not application data, so local state is fair game
  // here. Unanswered is the default view per the rubric. 📌
  const [view, setView] = useState('unanswered')

  const allIds = Object.keys(questions)
  const answers = (users[authedUser] && users[authedUser].answers) || {}

  const unansweredIds = allIds.filter((id) => !answers[id])
  const answeredIds = allIds.filter((id) => answers[id])

  // Newest timestamp sorts to the top. ⏱️ Same comparator, reused for both lists.
  const byNewestFirst = (a, b) => questions[b].timestamp - questions[a].timestamp
  unansweredIds.sort(byNewestFirst)
  answeredIds.sort(byNewestFirst)

  const idsToShow = view === 'unanswered' ? unansweredIds : answeredIds

  return (
    <div className="home">
      <div className="home-toggle">
        <button
          className={view === 'unanswered' ? 'active' : ''}
          onClick={() => setView('unanswered')}
        >
          Unanswered
        </button>
        <button
          className={view === 'answered' ? 'active' : ''}
          onClick={() => setView('answered')}
        >
          Answered
        </button>
      </div>

      <div className="home-list">
        {/* An empty state, just in case a bucket has nothing in it. 🌵 */}
        {idsToShow.length === 0 && <p>Nothing here yet.</p>}
        {idsToShow.map((id) => (
          <QuestionCard key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export default Home

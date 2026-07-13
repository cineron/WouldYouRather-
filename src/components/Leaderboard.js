import React from 'react'
import { useSelector } from 'react-redux'

// A ranked list of everybody in the app. 🏆 The score is simply questions
// asked plus questions answered -- highest score sits at the top.
function Leaderboard() {
  const users = useSelector((state) => state.users)

  const rankedUsers = Object.keys(users)
    .map((id) => {
      const user = users[id]
      const questionsAsked = user.questions.length
      const questionsAnswered = Object.keys(user.answers).length

      return {
        id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionsAsked,
        questionsAnswered,
        score: questionsAsked + questionsAnswered,
      }
    })
    .sort((a, b) => b.score - a.score)

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      {rankedUsers.map((user) => (
        <div key={user.id} className="leaderboard-card">
          <img
            className="leaderboard-avatar"
            src={user.avatarURL}
            alt={user.name}
          />
          <div className="leaderboard-info">
            <p className="leaderboard-name">{user.name}</p>
            <p>Score: {user.score}</p>
            <p>Questions asked: {user.questionsAsked}</p>
            <p>Questions answered: {user.questionsAnswered}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard

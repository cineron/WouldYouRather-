import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

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
  // Each user's score is
  // questionsAsked + questionsAnswered, and the array gets sorted highest
  // score first. These classes just get slapped onto the first three cards
  // in that already-sorted list, by array index:
  //   index 0 -> leaderboard-card-gold   (highest score, rank #1)
  //   index 1 -> leaderboard-card-silver (rank #2)
  //   index 2 -> leaderboard-card-bronze (rank #3)
  // Everybody past 3rd place keeps the plain white card look.
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      {/* 🏅 Top three spots get a little medal treatment via CSS below. */}
      {rankedUsers.map((user, index) => {
        const medalClass =
          index === 0
            ? ' leaderboard-card-gold'
            : index === 1
            ? ' leaderboard-card-silver'
            : index === 2
            ? ' leaderboard-card-bronze'
            : ''

        return (
          <div key={user.id} className={'leaderboard-card' + medalClass}>
            <img
              className="leaderboard-avatar"
              src={user.avatarURL}
              alt={user.name}
            />
            <div className="leaderboard-info">
              <p className="leaderboard-name">{user.name}</p>
              <p className="leaderboard-score">Score: {user.score}</p>
              <p>Questions asked: {user.questionsAsked}</p>
              <p>Questions answered: {user.questionsAnswered}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Leaderboard

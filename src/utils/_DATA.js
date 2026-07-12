// This file is our "fake" backend. It behaves just like a real API would --
// everything returns a Promise and takes a little while to resolve -- but
// under the hood it's really just juggling these two JS objects in memory.
// That's why refreshing the page resets everything back to this starting data!

let users = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: 'https://i.imgur.com/vGqcRcE.jpg',
    answers: {},
    questions: [],
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://i.imgur.com/uknEyv0.jpg',
    answers: {},
    questions: [],
  },
  // Giving him a placeholder avatar for now --
  // avatar-placeholder.iran.liara.run generates a random "cool" cartoon avatar.
  ron: {
    id: 'ron_id',
    name: 'Ron',
    avatarURL: 'https://avatar.iran.liara.run/public/45',
    answers: {},
    questions: [],
  },
}

let questions = {}

// Small helper to cut down on typing. 
// it smashes together two random strings to get a unique id.
function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

// Quick helper to build a fully-formed question object and hook up all
// the cross references (author -> question, question -> empty votes, etc).
// Doing it this way keeps the dummy data below readable.
function createQuestion({ id, author, timestamp, optionOneText, optionTwoText }) {
  questions[id] = {
    id,
    author,
    timestamp,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  }

  users[author].questions.push(id)
}

// Car theme
createQuestion({
  id: 'car01',
  author: 'sarahedo',
  timestamp: 1609459200000,
  optionOneText: 'Commute in a 2000 Mercury Mountaineer V8.',
  optionTwoText: 'Commute in a 2021 BMW X5 M50i.',
})

// Tech / home server theme
createQuestion({
  id: 'tech01',
  author: 'tylermcginnis',
  timestamp: 1612137600000,
  optionOneText: 'Design a custom TrueNAS home server in a Jonsbo N4 chassis.',
  optionTwoText: 'Build a visual Langflow pipeline for LLM automation.',
})

// Motorcycle / sci-fi theme
createQuestion({
  id: 'moto01',
  author: 'ron_id',
  timestamp: 1614556800000,
  optionOneText: 'Ride a sports touring motorcycle through a heavy storm.',
  optionTwoText: 'Face a Xenomorph alone on an isolated spaceship.',
})

// Fitness theme
createQuestion({
  id: 'fit01',
  author: 'sarahedo',
  timestamp: 1617235200000,
  optionOneText: 'Do a Norwegian 4x4 HIIT workout.',
  optionTwoText: 'Do a heavy strength training session.',
})

// Below are our 4 "endpoints". Each one wraps the in-memory data above in
// a Promise + setTimeout, just to simulate the network delay of a real
// API call. This means the action creators need to use .then() (or thunks!)
// to actually get at the data -- good practice for real-world APIs later.

export function _getUsers() {
  return new Promise((res) => {
    setTimeout(() => res({ ...users }), 1000)
  })
}

export function _getQuestions() {
  return new Promise((res) => {
    setTimeout(() => res({ ...questions }), 1000)
  })
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  }
}

export function _saveQuestion(question) {
  return new Promise((res) => {
    const authedUser = question.author
    const formattedQuestion = formatQuestion(question)

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id]),
        },
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((res) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      }

      res()
    }, 500)
  })
}

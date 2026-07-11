import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import reducer from './reducers'
import middleware from './middleware'

// 🏗️ Build the store! reducer knows how to update state, middleware
// (thunk + logger) gets a say in every action before it lands.
const store = createStore(reducer, middleware)

// 🎁 <Provider> is the wrapper that hands the store down to every
// component in the DOM tree: not passed around as a prop.
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

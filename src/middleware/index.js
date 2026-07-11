import { applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import logger from './logger'

// 🔌 thunk dispatches functions (for async stuff like handleInitialData),
// logger just watches and reports. 
// Order matters here — thunk needs to run first 
// so logger sees the "real" dispatched action, 
// not the raw function.
export default applyMiddleware(thunk, logger)

// 🕵️ A middleware that snoops on every action and logs the
// before/after state to the console. Great for debugging, does nothing
// to the actual action — just watches and reports.
const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('The action: ', action)

  const result = next(action) // 👉 action does its thing

  console.log('The new state: ', store.getState())
  console.groupEnd()

  return result
}

export default logger

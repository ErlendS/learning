const R = require('ramda')

const tableStackReducer = (state = [], action = {}) => {
  const { type, payload = {} } = action


  if ( type === 'ADD_CARDS' ) {
    const { cards } = payload
    return R.concat(state, cards)
  }

  if ( type === 'REMOVE_CARDS' ) {
    const { cards } = payload
    return R.without(cards, state)
  }

  return state
}

module.exports = tableStackReducer

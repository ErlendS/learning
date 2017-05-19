const R = require('ramda')

const tableStackReducer = (state = [], action = {}) => {
  const { type, payload = {} } = action
  const { cards = {} } = payload

  // if (!R.propIs(String, '0', cards)) {
  //   return state
  // }

  if ( type === 'ADD_CARDS' ) {
    return R.concat(state, cards)
  }

  if ( type === 'REMOVE_CARDS' ) {
    return R.without(cards, state)
  }

  return state
}

module.exports = tableStackReducer

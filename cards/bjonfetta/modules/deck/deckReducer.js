const R = require('ramda')
const { ADD_TO_DECK, REMOVE_FROM_DECK, SET_DECK } = require('./deckActions');

const deckReducer = (state = [], action = {}) => {
  const { type, payload = {} } = action

  if (type === ADD_TO_DECK) {
    const { cards } = payload
    return R.concat(state, cards)
  }

  if (type === REMOVE_FROM_DECK) {
    const { cards } = payload
    return R.without(cards, state)
  }

  if (type === SET_DECK) {
    return [...payload.deck]
  }

  return state
}

module.exports = deckReducer

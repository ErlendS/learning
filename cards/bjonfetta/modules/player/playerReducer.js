const uuid = require('uuid/v4')
const R = require('ramda')
const { RECEIVE_CARDS, MAKE_MOVE } = require('./playerActions');


// const randomN = (n) => Math.floor(Math.random() * 1000000) % n
const initPlayer = () => ({
  id: uuid(),
  cards: { hand: [], fd: [], fu: [] },
})


const playerReducer = (playerState = initPlayer(), action = {}) => {
  const { type, payload = {} } = action

  if (payload.currentPlayerId !== playerState.id) {
    return playerState
  }

  if (type === MAKE_MOVE) {
    const { move, handKey } = payload
    if(!R.contains(handKey, ['hand', 'fd', 'fu'])) {
      return playerState
    }

    const newHand = R.compose(
      R.without(move),
      R.path(['cards', handKey])
    )(playerState)

    return R.assocPath(['cards', handKey], newHand, playerState)
  }

  if (action.type === RECEIVE_CARDS) {
    const { cards, handKey } = payload
    if(!R.contains(handKey, ['hand', 'fd', 'fu'])) {
      return playerState
    }

    const newHand = R.compose(
      R.concat(cards),
      R.path(['cards', handKey])
    )(playerState)
    return R.assocPath(['cards', handKey], newHand, playerState)
  }

  return playerState;
}


module.exports = playerReducer

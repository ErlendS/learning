const uuid = require('uuid/v4')
const chalk = require ('chalk')
const R = require('ramda')

// const randomN = (n) => Math.floor(Math.random() * 1000000) % n
const initPlayer = () => ({
  id: uuid(),
  cards: { hand: [], fd: [], fu: [] },
})


const playerReducer = (playerState = initPlayer(), action = {}) => {
  const { type, payload = {}  } = action

  if (payload.currentPlayerId !== playerState.id) {
    return playerState
  }



//   playerJson = {
//     id: 'a235sd564sad',
//     name: 'erlend',
//     hand: { fu: [], fd: [], hand: [] },
//   }

  if (type === 'MAKE_MOVE') {
    const { move, handKey = 'hand' } = payload
    // const newPlayer = makeMove(playerState, move)
    return newPlayer
  }

  if (action.type === 'RECEIVED_CARDS') {
    const { cards, handKey = 'hand' } = payload

    // const newHand = playerState['cards'][handKey].concat(cards);
    const newHand = R.compose(
      R.concat(cards),
      R.path(['cards', handKey])
    )(playerState)

    return R.assocPath(['cards', handKey], newHand, playerState)
  }
  // if (action.type === 'RECEIVED_CARDS') {
  //   const { cards, handKey = 'hand' } = payload
  //   const newHand = playerState['cards'][handKey].concat(cards);
  //   const newPlayerState = R.assocPath(['cards',handKey], newHand, playerState)
  //
  //   return newPlayerState;
  // }

  return playerState;
}


module.exports = playerReducer

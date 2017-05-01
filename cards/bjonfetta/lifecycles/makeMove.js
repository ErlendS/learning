const utils = require('../bjonfettaUtils.js')
const R = require('ramda');
const playerReducer = require('../reducers/playerReducer.js')


const findPlayerById = R.curryN(2, (id, players) =>
  R.find(R.compose(
    R.equals(id),
    R.prop('id')
  ), players)
)

function makeMove(game) {
  const { currentPlayerId, tableStack } = game
  const currentPlayer = findPlayerById(currentPlayerId, game.players)
  const hand = currentPlayer.cards.hand
  const move = utils.simpleMakeMove(tableStack, hand)

  return gameReducer(game, {
    type: 'MAKE_MOVE',
    payload: { move: move },
  })


  //
  // const newPlayer = playerReducer(currentPlayer, )
  //
  // const newTableStack = tableReducer(tableStack, {
  //   type: 'MAKE_MOVE',
  //   payload: { move: move },
  // })
  //
  // return Object.assign({}, game, {
  //   tableStack: newTableStack,
  //   players: game.players.map((player) => {
  //     if (player.id === currentPlayerId) {
  //       return newPlayer
  //     }
  //     return player
  //   })
  // })
  // const playerReducer
}

module.exports = makeMove

const gameFactory = require('../gameFactory.js')
const createPlayer = require('../playerFactory.js')
const BjonfettaHand = require('./BjonfettaHand.js')
const Deck = require('../deck.js')
const utils = require('./bjonfettaUtils.js')
const R = require('ramda')

NUMBER_OF_PLAYERS = 3

bjonfettaAPI = gameFactory()

bjonfettaAPI.setLifecycle('initGame' , initGame)
bjonfettaAPI.setLifecycle('setPlayerOrder' , setPlayerOrder)
bjonfettaAPI.setLifecycle('makeMove' , makeMove)
bjonfettaAPI.setLifecycle('validateStack' , validateStack)
bjonfettaAPI.setLifecycle('undoLastMove' , undoLastMove)
bjonfettaAPI.setLifecycle('afterRound' , afterRound)

for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
  bjonfettaAPI.addPlayer(createPlayer(`Player_${i}`, {
    makeMove,
    initHand: BjonfettaHand,
  }))
}

bjonfettaAPI.playGame()

function initGame(game) {
  const { players } = game
  for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
    const playerHand = players[i].getHand()
    playerHand.reciveCards(game.deck.getN(3), "hand")
    playerHand.reciveCards(game.deck.getN(3), "fu")
    playerHand.reciveCards(game.deck.getN(3), "fd")
    console.log(playerHand);
  }
  return game
  // Option to switch
}

function setPlayerOrder(game) {
  const transformPlayerFn = (player) => {
    return PlayerObj = {
      id: player.id,
      hand: player.getHand().getHand('hand')
    }
  }

  const getIdOfStartingPlayer = R.compose(
    R.prop('id'),
    R.head,
    utils.sortPlayers,
    R.map(transformPlayerFn)
  )
  const startingId = getIdOfStartingPlayer(game.players)
  
  const getIndexOfStartingPlayer = R.findIndex(R.propEq(`id`, startingId))
  const indexOfStartingPlayer = getIndexOfStartingPlayer(game.players)

  const defaultOrder = R.range(0, NUMBER_OF_PLAYERS)
  game.playerOrder = utils.shiftStartIndex(indexOfStartingPlayer)(defaultOrder)

  return game
}

function makeMove(game) {
  return game
}

function validateStack(game){
  return game
}
function undoLastMove(game) {
  return game
}
function afterRound(game) {
  if (game.round > 1)
    game.isDone = true
  return game
}

// --- Bjonfetta utility functions ---

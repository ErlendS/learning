const R = require('ramda')
const CardStack = require('./cardStackFactory.js')
const Deck = require('./deck.js')

const createDeck = Deck.generateShuffledDeck

module.exports = function makeGame(initState = {}) {
  let gameState = {
    id: "001",
    players: [],
    tableStack: CardStack(),
    round: 0,
    deck: CardStack(createDeck()),
    currentPlayer: null,
    pickedCards: {},
    history: [],
    lifecycle: {
      initGame: () => {},
      makeMove: () => {},
      validateStack: () => {},
      undoLastMove: () => {},
      afterPlayEffect: () => {},
      afterRound: () => {},
    }
  }

  gameState = Object.assign(gameState, initState)

  return Object.assign(
    {},
    {
      setLifecycle: (name, fn) => {
        gameState.lifecycle[name] = fn
      },
      addPlayer: (player) => {
        gameState.players.push(player)
      },
      playGame: () => startGame(gameState),
      // oneMove: () => gameState = oneMove(gameState),
      // oneRound: () => gameState = oneRound(gameState),
    }
  )
}


function startGame(gameState) {
  console.log('game started');
  const history = []

  gameState = gameState.lifecycle.initGame(R.clone(gameState))

  while (!gameState.isDone) {
    console.log('-=-=--=-=- Starting round ' + gameState.round);
    history.push(gameState)
    // const currentGame = R.clone(gameState)
    // gameState = oneRound(currentGame)
    gameState = oneRound(R.clone(gameState))
    gameState.round = gameState.round + 1
  }

  console.log('game over');
}

function oneRound(gameState) {
  for (let i = 0; i < gameState.players.length; i++) {
    gameState.currentPlayer = gameState.players[i]
    console.log('Current Player is ' + gameState.currentPlayer.name)

    if (!gameState.currentPlayer.isDone()) {
      gameState = gameState.lifecycle.makeMove(gameState)
    }

    if (!gameState.lifecycle.validateStack(gameState)) {
      gameState.lifecycle.undoLastMove(gameState)
      i--
      continue
    }

    gameState.lifecycle.afterPlayEffect(gameState)
    // if unvalid move, currentPlayer same,
    // get last tableStack (or remove last value)
    // OBS ------>  !i++
  }
  gameState.lifecycle.afterRound(gameState)
  return gameState
}

const R = require('ramda')
const chalk = require ('chalk')
const CardStack = require('./cardStackFactory.js')
const Deck = require('./deck.js')


const createDeck = Deck.generateShuffledDeck

module.exports = function makeGame(initState = {}) {
  let gameState = {
    id: "001",
    players: [],
    playerOrder: [],
    tableStack: CardStack(),
    round: 0,
    deck: CardStack(createDeck()),
    currentPlayer: null,
    ranking: [],
    pickedCards: {},
    history: [],
    lifecycle: {
      initGame: () => {},
      makeMove: () => {},
      validateStack: () => {},
      undoLastMove: () => {},
      afterPlayEffect: () => {},
      afterRound: () => {},
      setPlayerOrder: (_gameState) => {
        const n = _gameState.players.length
        const order = []
        for (let i = 0; i < n; i++) {
          order.push(i)
        }
        _gameState.playerOrder = order
        return _gameState
      },
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
  gameState = gameState.lifecycle.setPlayerOrder(R.clone(gameState))

  while (!gameState.isDone) {
    console.log('-=-=--=-=- Starting round ' + gameState.round);
    history.push(gameState)
    // const currentGame = R.clone(gameState)
    // gameState = oneRound(currentGame)
    gameState = oneRound(R.clone(gameState))
    gameState.round = gameState.round + 1
  }
  console.log('The Winners are ' + gameState.ranking.toString());
  console.log('game over');
}

function oneRound(gameState) {
  for (let i = 0; i < gameState.players.length; i++) {
    const n = gameState.playerOrder[i]
    gameState.currentPlayer = gameState.players[n]
    const player = gameState.currentPlayer
    if (!gameState.currentPlayer.isDone()) {
      gameState = gameState.lifecycle.makeMove(gameState)
      if (!gameState.lifecycle.validateStack(gameState)) {
        gameState.lifecycle.undoLastMove(gameState)
        i--
        continue
      }

      gameState.lifecycle.afterPlayEffect(gameState)
    }

  }
  gameState.lifecycle.afterRound(gameState)

  return gameState
}

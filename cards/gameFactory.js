const R = require('ramda')
const chalk = require ('chalk')
const CardStack = require('./cardStackFactory.js')
const Deck = require('./deck.js')


const createDeck = Deck.generateShuffledDeck

module.exports = function makeGame(lifecycles) {

  return Object.assign(
    {},
    {
      playGame: gameState => startGame(lifecycles, gameState),
    }
  )
}

function startGame(lifecycles, gameState) {
  console.log('game started');
  const history = []
  gameState = lifecycles.initGame(R.clone(gameState))
  console.log(gameState);
  gameState = lifecycles.setPlayerOrder(R.clone(gameState))
  while (!gameState.isDone) {
    console.log('-=-=--=-=- Starting round ' + lifecycles.round);
    history.push(gameState)
    gameState = oneRound(R.clone(lifecycles), R.clone(gameState))
    lifecycles.round = lifecycles.round + 1
  }
  console.log('The Winners are ' + lifecycles.ranking.toString());
  console.log('game over');
}

function oneRound(lifecycles, gameState) {
  console.log(gameState);
  const playersKeys = R.keys(gameState.players)
  for (let i = 0; i < playersKeys.length; i++) {
    console.log('______________LOOP_________________');
    // console.log(lifecycles.playerOrder)
    const n = lifecycles.playerOrder[i]
    const currentPlayer = gameState.players[playersKeys[n]]
    // console.log(!currentPlayer.isDone());
    if (!lifecycles.playerIsDone(currentPlayer)) {
      console.log(`${currentPlayer.id} not done, attempt makeMove`);
      const maybeValidGameState = lifecycles.makeMove(gameState, currentPlayer)
      if (!lifecycles.validateStack(maybeValidGameState)) {
        // lifecycles.undoLastMove(gameState)
        i--
        continue
      } else {
        // it is valid :)
        gameState = maybeValidGameState
      }
      console.log('valid move, stack now ' + gameState.tableStack);

      lifecycles.afterPlayEffect(gameState)
    }
  }

  lifecycles.afterRound(lifecycles, gameState)

  return gameState
}

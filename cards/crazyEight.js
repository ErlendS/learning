const makeGame = require('./gameFactory.js');
const Deck = require('./deck.js')
const Player = require('./playerFactory.js');

const NUMBER_OF_PLAYERS = 4

const crazyEightAPI = makeGame({})

// set lifecycle methods (called after playGame)
crazyEightAPI.setLifecycle('initGame', initGame)
crazyEightAPI.setLifecycle('makeMove', makeMove)
crazyEightAPI.setLifecycle('validateStack', validateStack)
crazyEightAPI.setLifecycle('undoLastMove', undoLastMove)
crazyEightAPI.setLifecycle('afterPlayEffect', afterPlayEffect)
crazyEightAPI.setLifecycle('afterRound', afterRound)

for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
  crazyEightAPI.addPlayer(Player('player_' + i))
}

crazyEightAPI.playGame()

function initGame(game) {
  for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
    const someCards = game.deck.getN(6)
    game.players[i].receiveCards(someCards)
  }

  const oneCard = game.deck.getN(1)
  game.tableStack.push(oneCard)

  // const randomNumberOf = n => {
  //   return Math.floor(Math.random() * 1000000) % n
  // }
  //
  // function attemptPlaceFistCard() {
  //   let card = getCardsFromDeck(1)
  //   if (card.includes('8')) {
  //     // place card back in random position in deck
  //     game.deck.splice(randomNumberOf(game.deck.length), 0, card)
  //     return attemptPlaceFistCard()
  //   }
  //   function placeCardOnTopOfTableStack(card, tableStack) {}
  // }
  return game
}
// player_1 start game

function makeMove(game) {
  const { currentPlayer, tableStack } = game
  const theMove = currentPlayer.makeMove()
  console.log(theMove);
  tableStack.push(theMove)
  return game
}

function validateStack(game) {
  return true
}

function undoLastMove(game) {
  return game
}

function afterPlayEffect(game) {
  return game
}

function afterRound(game) {
  const playersDone = game.players.reduce((allDone, player) =>
    player.isDone() && allDone, true
  )

  if (game.round > 20 || playersDone)
    game.isDone = true

  return game
}

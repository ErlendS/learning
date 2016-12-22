const makeGame = require('./gameFactory.js');
const Deck = require('./deck.js')
const Player = require('./playerFactory.js');
const { get, set } = require('lodash');

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

  const [oneCard] = game.deck.getN(1)
  if (oneCard) {
    console.log(`FIRST CARD IS ${oneCard}`);
    game.tableStack.push([oneCard])
  } else {
    console.error('Warning: you 99% surly have too many players.');
  }

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
  const theMove = currentPlayer.makeMove(game.round)

  if (theMove === null) {
    const {pickedCards, round } = game
    let penaltyCards = get(game, ['pickedCards', currentPlayer.id, round], [])
    if (penaltyCards.length <= 2) {
      const cards = game.deck.getN(1)
      currentPlayer.receiveCards(cards)
      penaltyCards = penaltyCards.concat(cards)
      set(pickedCards, [currentPlayer.id, round], penaltyCards)
    } else {
      console.log(`Maximum penaltycards reached`);
      return game
    }
    console.log(`ROUND NR ${round} PENALTYCARDS ${penaltyCards.join(', ')}`);

    return makeMove(game)
  }

  console.log(`==> MAKE MOVE: Player ${currentPlayer.name} – ${theMove}`);
  // console.log(theMove);


  tableStack.push(theMove)
    return game




}
function validateMove(currentMove, prevMove, currentPlayer) {
  const card = currentMove[0]
  const lastCard = prevMove[0]
  const hand = currentPlayer.getHand()
// TODO: run card through elimination process instead.
  if (Deck.cardValue(card) === 8 && hand.length !== 0) {
    console.log('==> Cannot finish with an 8');
    return true
  }
  if (Deck.cardSuit(card) === Deck.cardSuit(lastCard)) {
    console.log(`==> Wrong suit, should be ${Deck.cardSuit(lastCard)}`);
    return true
  }
  if (Deck.cardValue(card) === Deck.cardValue(lastCard)) {
    console.log(`==> Wrong value, should be ${Deck.cardValue(lastCard)}`);
    return true
  }
  return false
}

function validateStack(game) {
  const stackOfCards = game.tableStack.getAll()

  const i = stackOfCards.length - 1
  const currentMove = stackOfCards[i]
  const prevCard = stackOfCards[i - 1]
  const currentPlayer = game.currentPlayer
  return validateMove(currentMove, prevCard, currentPlayer)

}


function undoLastMove(game) {
  const lastCard = game.tableStack.pop()
  game.currentPlayer.receiveCards(lastCard)
  return game
}

function afterPlayEffect(game) {
  return game
}

function afterRound(game) {
  const playersDone = game.players.reduce((allDone, player) =>
    player.isDone() && allDone, true
  )
  console.log('<><><><><><><><><><><><><><><><><><><><><><><><><>');
  if (game.round > 1 || playersDone)
    game.isDone = true

  return game
}

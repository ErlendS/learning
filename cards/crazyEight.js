const { get, set, flatten } = require('lodash');
const { type } = require('ramda');
const chalk = require ('chalk')
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

  const [oneCard] = game.deck.getN(1)
  if (oneCard) {
    console.log(`FIRST CARD IS ${oneCard}`);
    game.tableStack.push([oneCard])
  } else {
    console.error('Warning: you 99% surly have too many players.');
  }

  return game
}
// player_1 start game
function makeMove(game) {
  const { currentPlayer, tableStack, deck } = game
  const cardsLeftInDeck = deck.getAll().length
 console.log(cardsLeftInDeck + ' CARDSLEFT');
 if (cardsLeftInDeck === 0) {
   console.log(`Shuffling tablestack`);
   const prevMove = tableStack.getN(1)
   const cardsToShuffle = flatten(tableStack.getAll())
   const newDeck = Deck.shuffle(cardsToShuffle)

   console.log(require('util').inspect(prevMove, { depth: null }));
   console.log(require('util').inspect(newDeck, { depth: null }));
   deck.set(newDeck)
   tableStack.set(prevMove)
  //feil -- tablestack.clear.push(currentCard)
   // deck = currentCard
 }
  // TODO: When deck is empty shuffe tablestack.
  // remove and shuffle all cards except top card in
  // tablestack. place shuffled cards in deck.
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

  tableStack.push(theMove)
  return game
}



function validateMove(currentMove, prevMove, currentPlayer) {
  if (type(currentMove[0]) !== 'String') {
    console.log(require('util').inspect(currentMove, { depth: null }));
    console.log(require('util').inspect(currentMove[0], { depth: null }));
    console.log(typeof currentMove[0]);

    console.log(chalk.red('Warning: No card found in move!'));
    throw Error('I TOLD YOU MOTHERFUCKER! CURRENTMOVE IS NOT AN ARRAY!')
  }
  const card = currentMove[0]
  const lastCard = prevMove[0]
  const hand = currentPlayer.getHand()
// TODO: run card through elimination process instead.

  const cardVal  = Deck.cardValue(card)
  const hasMoreCards = hand.length !== 0


  if (cardVal === 8 && hasMoreCards) {
    console.log('==> Valid move, can finish with an 8');
    return true
  }
  if (Deck.cardSuit(card) === Deck.cardSuit(lastCard)) {
    console.log(`==> Valid move, suit is ${Deck.cardSuit(lastCard)}`);
    return true
  }
  if (Deck.cardValue(card) === Deck.cardValue(lastCard)) {
    console.log(`==> Valid move, value is ${Deck.cardValue(lastCard)}`);
    return true
  }
  console.log(`Invalid move: ${card} on ${lastCard}`);
  return false
}

function validateStack(game) {
  const stackOfCards = game.tableStack.getAll()
  if (stackOfCards.length <= 1) {
    return true
  }

  const i = stackOfCards.length - 1
  const currentMove = stackOfCards[i]
  const prevCard = stackOfCards[i - 1]
  const currentPlayer = game.currentPlayer
  console.log(chalk.white(`Table card is ${prevCard}, attempting to place "${currentMove}"`));
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
  console.log('Round ' + game.round);
  console.log('<><><><><><><><><><><><><><><><><><><><><><><><><>');
  if (game.round > 100 || playersDone)
    game.isDone = true

  return game
}

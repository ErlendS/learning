const gameFactory = require('../gameFactory.js')
const appReducer = require('./appReducer')
const utils = require('./bjonfettaUtils')
const { createPlayers, initPlayersHands } = require('./appActions')
const { actions: playersActions } = require('./modules/player')
const { actions: tableStackActions } = require('./modules/tableStack')
const { actions: deckActions } = require('./modules/deck')
const R = require('ramda');
const { generateShuffledDeck } = require('../deck.js');
const { validateStack } = require('./lifecycles.js')

const _appReducer = R.flip(appReducer)
const NUMBER_OF_PLAYERS = 3
const deck = generateShuffledDeck()

const lifecycles = {
  initGame,
  setPlayerOrder,
  round: 0,
  makeMove,
  afterPlayEffect,
  afterRound,
  ranking: ['Nobody'],
  playerIsDone,
  validateStack,
  playerOrder: []

}
const bjonfettaAPI = gameFactory(lifecycles) // <-- inversion of control

bjonfettaAPI.playGame()

function initGame(state) {
  return R.compose(
    _state => R.reduce(appReducer, _state, initPlayersHands(undefined, _state)),
    _appReducer(deckActions.setDeck({ deck })),
    _state => R.reduce(appReducer, _state, createPlayers({ n: NUMBER_OF_PLAYERS }, _state))
  )(state)
}
// troubleshoot: in initgame when we call appReducer with state(which is gameState from gameFactory),
// redux will ignore the gameState keys which hasn't been preloaded.
// So all keys are there before reduc run, which is why we can run gameState.lifecycle.initGame,
// but the keys are removed once we call appReducer. that's why setPlayerOrder is undefined.
function setPlayerOrder(state) {
  const playerOrder = utils.sortPlayers(R.values(state.players))
  const startingPlayerId = R.head(playerOrder).id
  const indexOfStartingPlayer = R.findIndex(
    R.propEq('id', startingPlayerId),
    R.values(state.players)
  )

  const defaultOrder = R.range(0, NUMBER_OF_PLAYERS)
  lifecycles.playerOrder = utils.shiftStartIndex(indexOfStartingPlayer, defaultOrder)
  return state
}


function makeMove(state, currentPlayer) {
  if (state.deck.length !== 0) {
    const handKey = 'hand'
    const cardsToPlace = utils.simpleMakeMove(state.tableStack, currentPlayer.cards.hand)
    console.log(`Deck is not empty - card to place ${cardsToPlace}`);
    if (cardsToPlace.length === 0) {
      return playerTakesChance(state, currentPlayer)

    } else {
      return R.compose(
        _appReducer(playersActions.actionMakeMove(
          { id: currentPlayer.id,
            move: cardsToPlace,
            handKey }
          )),
        _appReducer(tableStackActions.actionAddCards({ cards: cardsToPlace }))
      )(state)
    }
  }

  else {
    // find handKey to use
    const handKeys = ['hand', 'fu', 'fd']
    for (let i = 0; i <= 2; i++) {
      // if player has card in handKey, player starts to make move
      if (R.length(currentPlayer.cards[handKeys[i]]) === 0) { continue }

      const cards = utils.simpleMakeMove(state.tableStack, currentPlayer.cards[handKeys[i]])

      if (R.length(cards) === 0) {
        // player recives tableStack
        const tableStack = state.tableStack
        const newState = appReducer(state, tableStackActions.actionRemoveCards({ cards:tableStack }))
        return appReducer(newState, playersActions.actionReciveCards({
          id: currentPlayer.id,
          move: tableStack,
          handKey: handKeys[i]
        }))
      }
      // player makesMove
      return appReducer(playersActions.actionMakeMove({
        id: currentPlayer.id,
        cards,
        handKey: handKeys[i]
      }))
    }
  }
}



function afterPlayEffect() {
  // check hand.length, if less than 3, hand deck is still in game, deal cards to player
  // if 10, clear tableStack
  // if 4 of a kind, clear tableStack
}

function playerIsDone(player) {
  return R.compose(
    R.equals(0),
    R.sum,
    R.map(R.length),
    R.values,
    R.prop('cards')
  )(player)
}


function afterRound(lifecycles, state) {
  if (lifecycles.round > 2)
    state.isDone = true
  return state
}


function playerTakesChance(state, currentPlayer) {
  const chanceCard = R.head(state.deck)
  console.log('no card to place, picking card from deck')
  console.log(`card from deck ${chanceCard}`);
  let newState = appReducer(state, deckActions.removeFromDeck({ cards: chanceCard }))
  newState = appReducer(newState, tableStackActions.actionAddCards({ cards: chanceCard}))

  if (validateStack(newState) === true) {
    return newState

  } else {
    console.log('Not valid, player recives tableStack');
    const tableStack = newState.tableStack
    newState = appReducer(newState, tableStackActions.actionRemoveCards({ cards: tableStack }))
    return appReducer(newState, playersActions.actionReciveCards({ id: currentPlayer.id, cards: tableStack, handKey: 'hand' }))
  }
}

// const state = appReducer(undefined, undefined)
// const newState = initGame(state)
// console.log(setPlayerOrder(newState));

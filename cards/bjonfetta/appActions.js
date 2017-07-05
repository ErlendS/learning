// const appReducer = require('./appReducer')
const { actions: playersActions } = require('./modules/player')
const { actions: tableStackActions } = require('./modules/tableStack')
const { actions: deckActions } = require('./modules/deck')
const R = require('ramda');
const { repeatEach, zipWith3 } = require('./bjonfettaUtils')
// const uuid = require('uuid/v4');
// combined actions arrays


// const _appReducer = R.flip(appReducer)
function createPlayers(options, state) {
  const { n } = options
  let combinedActions = []
  for (let i = 0; i < n; i++) {
    const id = `Player_${i}`
    // ids = R.insert(0, `Player_${i}`, ids)
    combinedActions = R.concat(combinedActions, playersActions.actionCreatePlayer({ id }))
  }

  return combinedActions
}

// options -> state -> [actions]
// function expects to have nPlayers and a deck
const initPlayersHands = R.curryN(2,function initPlayersHands(options, state) {
  const _players = Object.values(state.players)
  const nPlayers = _players.length
  const nCards = nPlayers * 9
  const cards = R.slice(0, nCards, state.deck)

  if (nCards > 52) {
    return console.error('players exceed deck capacity');
  }

  const actions = [deckActions.removeFromDeck({ cards })]

  const groupedCards = R.splitEvery(3, cards)
  const ids = R.keys(state.players)

  const args = zipWith3(
    repeatEach(['hand', 'fu', 'fd'], ids.length),
    R.compose(R.flatten, R.repeat(ids))(ids.length),
    groupedCards
  );

  const dealTo = ([handKey, id, cards]) =>
    playersActions.actionReciveCards({ id, handKey, cards })
  return R.concat(actions, R.map(dealTo, args))
})

module.exports = {
  createPlayers: R.curryN(2, createPlayers),
  initPlayersHands
}

const test = require('ava');
const R = require('ramda')
const appReducer = require('../appReducer');
const { actions: playerActions } = require('../modules/player')
const { actions: tableActions } = require('../modules/tableStack');
const { actions: deckActions } = require('../modules/deck')
const { createPlayers, initPlayersHands } = require('../appActions');
const { generateDeck, generateShuffledDeck } = require('../../deck.js');
const utils = require('../bjonfettaUtils')



const _appReducer = R.flip(appReducer)

// test('appReducer - sortsPlayers', t => {
//   const initState = appReducer(undefined, undefined)
//   const deck = generateShuffledDeck() //unshuffled deck aka predictable
//
//   const state = R.compose(
//     _state => R.reduce(appReducer, _state, initPlayersHands(undefined, _state)),
//     _appReducer(deckActions.setDeck({ deck })),
//     _state => R.reduce(appReducer, _state, createPlayers({ n: 3 }, _state))
//   )(initState)
//
//   console.log(utils.sortPlayers(R.values(state.players)));
// })

test('appReducer - initPlayersHands connects to the deck and the players modules',t => {
  // generate players and deck.
  const initState = appReducer(undefined, undefined)
  const deck = generateDeck() //unshuffled deck aka predictable

  const state = R.compose(
    _state => R.reduce(appReducer, _state, initPlayersHands(undefined, _state)),
    _appReducer(deckActions.setDeck({ deck })),
    _state => R.reduce(appReducer, _state, createPlayers({ n: 3 }, _state))
  )(initState)
  console.log(R.values(state.players));
  t.snapshot(state)
  t.true(initState !== state)
})


test('appReducer - createPlayers connects to playersReducer', t => {
  const options = { n: 3 }
  const state = appReducer(undefined, undefined)
  const actual = R.reduce(appReducer, undefined , createPlayers(options, state))
  // const actual = appReducer(state, createPlayers(options, state))
  t.snapshot(actual)
})

test('appReducer - initializes state if inputs are undefined', t => {
  const actual = appReducer(undefined, undefined)
  t.snapshot(actual)

})
test('appReducer - connects to playerReducer', t => {
  const id1 = "Player_1"
  const id2 = "player_2"

  const actual = R.compose(
    _appReducer(playerActions.actionCreatePlayer({ id: id2})),
    _appReducer(playerActions.actionCreatePlayer({ id: id1}))
  )(undefined)

  t.snapshot(actual)
})


test('appReducer - connects to tableStackReducer', t => {
  const cards = ['H_2', 'S_13']
  const actual = appReducer(undefined, tableActions.actionAddCards({ cards }))
  t.snapshot(actual)
})


test('appReducer - connects to deckReducer', t => {
  const cards = ['S_3', 'D_3']
  const actual = appReducer(undefined, deckActions.addToDeck({ cards }))
  const expected = {
    tableStack: [],
    players: {},
    deck: ['S_3', 'D_3']
  }
  t.deepEqual(expected, actual)
  t.snapshot(actual)
})


test('appReducer - returns state if action is invalid', t => {
  const state = appReducer()
  const newState = appReducer(state, playerActions.actionCreatePlayer({ id: 'Player_1'}))
  const fakeAction = {
    payload: 'FAKE_NEWS',
    type: 'REMOVE_KARDS'
  }
  const actual = appReducer(newState, fakeAction)
  t.snapshot(actual)
})

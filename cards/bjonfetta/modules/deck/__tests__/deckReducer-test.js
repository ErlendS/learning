const test = require('ava')
const { reducer: deckReducer, actions } = require('../index');

test('deckReducer -- initialises state if state is undefined', t => {
  const actual = deckReducer(undefined, undefined)
  const expected = []

  t.deepEqual(expected, actual)
})

test('deckReducer -- appends cards to existing state', t => {
  const cards = ['H_5', 'S_5']
  const state = ['H_12']
  const actual = deckReducer(state, actions.addToDeck({ cards }))
  const expected = [...state, ...cards]

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object refrence')
})
test('deckReducer -- sets state if state is undefined ', t => {
  const cards = ['H_5', 'S_5']
  const actual = deckReducer(undefined, actions.addToDeck({ cards }))
  const expected = [...cards]

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object refrence')
})


test('deckReducer -- can remove cards from deck', t => {
  const state = ['S_4', 'S_5', 'D_5']
  const cards = ['S_5', 'D_5']

  const actual = deckReducer(state, actions.removeFromDeck({ cards }))
  const expected = ['S_4']

  t.deepEqual(expected, actual)
  t.true(actual !== state, 'has to return a new object refrence')
})


test('deckReducer -- returns state if action type is unrecongnised', t => {
  const state = ['S_3']

  const expected = state

  t.deepEqual(expected, deckReducer(state, 'Steal Card'), 'invalid action')

  const actual = deckReducer(state, {
    type: 'asd', payload: 'yo momma',
  })
  t.deepEqual(expected, actual)
  t.true(state === actual, 'retains the object reference')
})

test('deckReducer -- overwrites current state if it exists', t => {
  const deck = ['S_13', 'H_14', 'S_10']
  const newState = deckReducer(['H_2', 'S_4'], actions.setDeck({ deck }))
  t.deepEqual(deck, newState)
  t.true(deck !== newState, 'Has to return a new object refrence')
})

test('deckReducer -- overwrites current state if it exists', t => {
  const deck = ['S_13', 'H_14', 'S_10']
  const newState = deckReducer(undefined, actions.setDeck({ deck }))
  t.deepEqual(deck, newState)
  t.true(deck !== newState, 'Has to return a new object refrence')
})

const test = require('ava');
const R = require('ramda')
const playersReducer = require('../playersReducer');
const { actionCreatePlayer, actionReciveCards, actionMakeMove, MAKE_MOVE } = require('../playerActions')

test('Reducer is a function', t => {
  t.true(typeof playersReducer === 'function')
})


test('initializes its own state', t => {
  const actual = playersReducer()
  const expected = {}

  t.deepEqual(expected, actual)
})


test('CREATE_PLAYER -- create player object with given id', t => {
   const id = 'id-1'
   const state = playersReducer()
   const action = actionCreatePlayer({ id })
   const actual = playersReducer(state, action)
   const expected = {
     [id]: {
       id,
       cards: { hand: [], fd: [], fu: [] },
     },
   }

   t.true(state !== actual, 'has to return a new object refrence')
   t.deepEqual(expected, actual)
 })



test('Delegates player action to player reducer when id is recognized', t => {
  const id = 'id-2'
  const state = playersReducer(undefined, actionCreatePlayer({ id }))
  const cards = ['H_2', 'S_3']
  const handKey = 'hand'
  const reciveCards = actionReciveCards({id, cards, handKey})
  const newState = playersReducer(state, reciveCards)
  const move = ['S_3']
  const action = actionMakeMove({id, move, handKey})

  const actual = playersReducer(newState, action)
  const expected = {
    [id]: {
      id,
      cards: { hand: ['H_2'], fd:[], fu:[] }
    }
  }
  t.deepEqual(expected, actual)
  t.true(newState !== actual )
})

test('Does not do anything if player id is not familiar', t => {
  const fakeId = 'mcLovin'
  const id = 'player_1'
  const state = playersReducer(undefined, actionCreatePlayer({ id }))
  const actual = playersReducer(state, actionReciveCards({ fakeId, cards: ['S_3'], handKey: 'hand' }))
  const expected = state

  t.deepEqual(expected, actual)
  t.true(expected === actual, 'Retains referential equality')
})

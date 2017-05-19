const test = require('ava');
const R = require('Ramda')
const tableStackReducer = require('../reducers/tableStackReducer');


// flip and curry for composability
const _tableStackReducer = R.flip(tableStackReducer)

function actionAddCards({ cards }) {
  return {
    payload: { cards },
    type: 'ADD_CARDS'
  }
}

function actionRemoveCards({ cards }) {
  return {
    payload: { cards },
    type: 'REMOVE_CARDS'
  }
}

test('reducer returns state when action is not recognized', t => {
  const state = []
  const actual = tableStackReducer(state)
  const expected = state
  t.true(expected === actual)
})


test('ADD_CARDS -- can add spesefied cards', t => {
  const tableStackState = []
  const cards = ['D_2', 'H_2']

  const actual = tableStackReducer(
    tableStackState,
    actionAddCards({ cards })
  )

  const expected = ['D_2','H_2']

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object reference')
})


test('ADD_CARDS -- return tableStackState if invalid type', t => {
  const tableStackState = []
  const cards = ['D_12', 'H_3']

  const actual = tableStackReducer(
    tableStackState,
    {
      payload: cards,
      type: 'ADD_KARDS'
    }
  )

  const expected = tableStackState

  t.deepEqual(expected, actual)
  t.true(expected === actual, 'Return original object refrence')
})

test('REMOVE_CARDS -- can remove spesefied cards', t => {
  const tableStackState = ['H_2', 'D_4', 'C_7', 'C_8', 'D_8' ]
  const cards = ['C_8', 'D_8']

  const actual = tableStackReducer(
    tableStackState,
    actionRemoveCards({ cards })
  )

  const expected = ['H_2', 'D_4', 'C_7']

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object refrence')
})


test('REMOVE_CARDS -- return tableStackState if invalid type', t => {
  const tableStackState = ['H_2', 'D_4', 'C_7', 'C_8', 'D_9']
  const cards =  ['D_9']

  const actual = tableStackReducer(
    tableStackState,
    {
      payload: { cards },
      type: 'REMOVE_KARDS'
    }
  )

  const expected = tableStackState

  t.deepEqual(expected, actual)
  t.true(expected === actual, 'returns orginal object refrence')
})

test('REMOVE_CARDS -- only removes cards in tablestack', t => {
  const tableStackState = ['H_2', 'D_4', 'C_7', 'C_8', 'D_8' ]
  const cards = ['D_8', 'C_14']

  const actual = tableStackReducer(
    tableStackState,
    actionRemoveCards({ cards })
  )
  const expected = ['H_2', 'D_4', 'C_7', 'C_8']

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object refrence')
})


test('can run multiple actions in sequence', t => {
  const tableStackState = []
  const cardsToAdd = ['H_2', 'D_4', 'C_7', 'C_8', 'D_8']
  const cardsToRemove = ['C_8', 'D_8']

  const actual = R.compose(
    _tableStackReducer(actionRemoveCards({ cards: cardsToRemove} )),
    _tableStackReducer(actionAddCards({ cards: cardsToAdd }))
  )(tableStackState)

  const expected = ['H_2', 'D_4', 'C_7']

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to retun a new object refrence')
})

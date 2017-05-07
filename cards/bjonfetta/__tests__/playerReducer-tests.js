const test = require('ava')
const R = require('ramda')
const uuid = require('uuid/v4');
const deepFreeze = require('deep-freeze')
const playerReducer = require('../reducers/playerReducer')

// flip and curry for composability
const _playerReducer = R.flip(playerReducer)

function actionReciveCards({ id, cards, handKey}) {
  return {
      payload: {
        currentPlayerId: id,
        cards: cards,
        handKey: handKey
      },
      type:'RECEIVED_CARDS'
  }
}

function actionSetName({ id, name }) {
  return {
    payload: {
      currentPlayerId: id,
      name,
    },
    type: 'SET_NAME',
  }
}

test('playerReducer - is a function', t => {
  t.true(typeof playerReducer === 'function')
})

test('RECEIVED_CARDS -- player can recive cards to hand', t => {
  const cards = ['S_3', 'S_5', 'D_10']
  const handKey = 'hand'
  const playerState = playerReducer()
  const { id } = playerState

  // this is how you would compose multiple actions together
  const actual = R.compose(
    // _playerReducer(actionSetName({ id, name: 'player_1' })),
    _playerReducer(actionReciveCards({ id, cards, handKey }))
  )(playerState)

  const expected = {
    id,
    cards: {
      hand:['S_3', 'S_5', 'D_10'],
      fd:[],
      fu:[]
    }
  }

  t.true(expected !== actual, 'has to return a new object reference')
  t.deepEqual(expected, actual)
})

test('RECEIVED_CARDS -- player can recive cards to fu', t => {
  const playerState = playerReducer()
  const action = actionReciveCards({
     cards: ['D_3','S_5', 'D_10'],
     handKey: 'fu',
     id: playerState.id
  })

  const actual = playerReducer(playerState, action)
  const expected = {
    id: playerState.id,
    cards: {
      hand: [],
      fd:[],
      fu:['D_3','S_5', 'D_10']
    }
  }

  t.true(expected !== actual, 'has to return a new object reference')
  t.deepEqual(expected, actual)
})


test('RECEIVED_CARDS -- player can recive cards to fd', t => {
  const playerState = playerReducer()
  const action = actionReciveCards({
    id: playerState.id,
    cards: ['D_7','S_9', 'D_13'],
    handKey: 'fd'
  })

  const actual = playerReducer(playerState, action)
  const expected = {
    id: playerState.id,
    cards: {
      hand:[],
      fd: ['D_7','S_9', 'D_13'],
      fu:[]
    }
  }

  t.true(expected !== actual, 'has to return a new object reference')
  t.deepEqual(expected, actual)
})


test('RECEIVED_CARDS -- receiving [] makes no change', t => {
  const playerState = playerReducer()
  const action = actionReciveCards({
    id: playerState.id,
    cards: [],
    handKey: 'hand'
  })
  const actual = playerReducer(playerState, action)
  const expected = {
    id: playerState.id,
    cards: {
      hand:[],
      fd:[],
      fu:[]
    }
  }

  t.true(expected !== actual, 'has to return a new object reference')
  t.deepEqual(expected, actual)
})


test('RECEIVED_CARDS -- unknown handKey does nothing', t => {
  const playerState = playerReducer()
  const action = actionReciveCards({
    id: playerState.id,
    handKey: 'table',
    cards: ['D_10', 'H_14']
  })

  const actual = playerReducer(playerState, action)
  const expected = {
    id: playerState.id,
    cards: {
      hand: [],
      fd: [],
      fu:[]
    }
  }

  t.true(expected !== actual, 'has to return a new object reference')
  t.deepEqual(expected, actual)
})


test('RECEIVED_CARDS -- if actions contains wrong id, no change is made', t => {
  const playerState = playerReducer()
  const action = actionReciveCards({
    id: uuid(),
    handKey: 'hand',
    cards: ['H_2']
  })

  const actual = playerReducer(playerState, action)
  const expected = playerState

  t.true(expected === actual, 'Should return same object reference')
  t.deepEqual(expected, actual)
})

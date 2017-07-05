const test = require('ava')
const R = require('ramda')
const uuid = require('uuid/v4');
//const deepFreeze = require('deep-freeze')
const playerReducer = require('../playerReducer')
const { actionReciveCards, actionMakeMove } = require('../playerActions');
// import playerAction from '../actions/playerActions'

// flip and curry for composability
const _playerReducer = R.flip(playerReducer)

test('MAKE_MOVE -- empty move', t => {
  const playerState = playerReducer()
  const {id} = playerState
  const cards = ['H_8', 'D_12', 'C_4']
  const handKey = 'hand'
  const move = []

  const actual = R.compose(
    _playerReducer(actionMakeMove({id, move, handKey})),
    _playerReducer(actionReciveCards({id, cards, handKey}))
  )(playerState)

  const expected = {
    id,
    cards: {
      fu: [],
      hand:['H_8', 'D_12', 'C_4'],
      fd: []
    }
  }

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'Has to return a new object reference')
})


test('MAKE_MOVE -- empty hand', t => {
  const playerState = playerReducer()
  const {id} = playerState
  const move = ['H_8', 'D_12', 'C_4']
  const handKey = 'fu'

  const actual = playerReducer(playerState, actionMakeMove({id, move, handKey}))
  const expected = playerState

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'Has to return a new object refrence')
})


test('MAKE_MOVE -- invalid handKey', t => {
  const playerState = playerReducer()
  const {id} = playerState
  const move = ['X_1', 'X_2', 'X_3']
  const handKey = 'fingers'
  const cards1 = ['X_1', 'X_2', 'X_3']
  const cards2 = ['Y_1', 'Y_2', 'Y_3']
  const cards3 = ['Z_1', 'Z_2', 'Z_3']

  const actual = R.compose(
    _playerReducer(actionMakeMove({id, handKey, move})),
    _playerReducer(actionReciveCards({id, cards: cards3, handKey: 'fd'})),
    _playerReducer(actionReciveCards({id, cards: cards2, handKey: 'fu'})),
    _playerReducer(actionReciveCards({id, cards: cards1, handKey: 'hand'}))
  )(playerState)

  const expected = {
    id,
    cards: {
      hand: ['X_1', 'X_2', 'X_3'],
      fu: ['Y_1', 'Y_2', 'Y_3'],
      fd: ['Z_1', 'Z_2', 'Z_3']
    }
  }

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'Has to return a new object refrence')
})


test('MAKE_MOVE -- only removes from spesified handkey', t => {
  const playerState = playerReducer()
  const {id} = playerState
  const cards1 = ['X_1', 'X_2']
  const cards2 = ['Y_1', 'Y_2']
  const cards3 = ['Z_1', 'Z_2']
  const handKey = 'hand'
  const move = ['X_1', 'X_2']

  const actual = R.compose(
    _playerReducer(actionMakeMove({id, handKey, move})),
    _playerReducer(actionReciveCards({id, cards: cards3,  handKey: 'fu' })),
    _playerReducer(actionReciveCards({id, cards: cards2, handKey: 'fd' })),
    _playerReducer(actionReciveCards({id, cards: cards1, handKey: 'hand' }))
  )(playerState)

  const expected = {
    id,
    cards: {
      hand:[],
      fu:['Z_1', 'Z_2'],
      fd:['Y_1', 'Y_2']
    }
  }

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'Has to return a new object reference')
})


test('MAKE_MOVE -- return playerState if wrong id', t => {
  const playerState = playerReducer()
  const { id } = playerState
  const id1 = 'qwert-098'
  const cards = ['C_3', 'D_5']
  const move = ['C_3']
  const handKey = 'hand'

  const actual = R.compose(
    _playerReducer(actionMakeMove({id1, move, handKey})),
    _playerReducer(actionReciveCards({id, cards, handKey}))
  )(playerState)

  const expected = {
    id,
    cards: {
      hand: ['C_3', 'D_5'],
      fu: [],
      fd: []
    }
  }

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'Has to return a new object refrence')
})


test('MAKE_MOVE -- can make move from fu', t => {
  const playerState = playerReducer()
  const { id } = playerState
  const handKey = 'fu'
  const cards = ['C_4', 'C_6', 'H_8']
  const move = ['H_8']

  const actual = R.compose(
    _playerReducer(actionMakeMove({id, move, handKey})),
    _playerReducer(actionReciveCards({id, handKey, cards}))
  )(playerState)

  const expected = {
    id,
    cards: {
      hand: [],
      fd: [],
      fu: ['C_4', 'C_6']
    }
  }

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object refrence')
})


test('MAKE_MOVE -- can make move from fd', t => {
  const playerState = playerReducer()
  const { id } = playerState
  const handKey = 'fd'
  const cards = ['C_2', 'X_3', 'D_12']
  const move = ['D_12']

  const actual = R.compose(
    _playerReducer(actionMakeMove({id, move, handKey})),
    _playerReducer(actionReciveCards({id, handKey, cards}))
  )(playerState)

  const expected = {
    id,
    cards: {
      hand: [],
      fu: [],
      fd: ['C_2', 'X_3']
    }
  }

  t.deepEqual(expected, actual)
  t.true(expected !== actual, 'has to return a new object refrence')
})


test('MAKE_MOVE -- removes spesified cards', t => {
    const playerState = playerReducer()
    const cards = ['S_2', 'D_2', 'D_7','D_9','S_10', 'D_13']
    const handKey = 'hand'
    const {id} = playerState
    const move = ['S_2', 'D_2']

    const actual = R.compose(
      _playerReducer(actionMakeMove({id, move, handKey})),
      _playerReducer(actionReciveCards({id, cards, handKey}))
    )(playerState)
    const expected = {
      id,
      cards: {
        hand: ['D_7','D_9','S_10', 'D_13'],
        fd: [],
        fu: []
      }
    }
    t.true(expected !== actual, 'has to return a new object refrence')
    t.deepEqual(expected, actual)
})


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

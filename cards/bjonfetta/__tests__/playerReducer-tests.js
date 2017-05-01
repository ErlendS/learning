const test = require('ava')
const R = require('ramda')
const uuid = require('uuid/v4');
const deepFreeze = require('deep-freeze')
const playerReducer = require('../reducers/playerReducer')

function actionReciveCards({ id, cards, handKey = 'hand' }) {
  return {
      payload: {
        currentPlayerId:id,
        cards:cards,
        handKey:handKey
      },
      type:'RECEIVED_CARDS'
  }
}


test('playerReducer - is a function', t => {
  t.true(typeof playerReducer === 'function')
})

test('RECEIVED_CARDS -- player with empty hand recives cards', t => {
  // const id = uuid()
  const cards = ['S_3', 'S_5', 'D_10']
  const handKey = 'hand'
  const playerState = playerReducer()
  const { id } = playerState

  // const action = {
  //   payload: {
  //     currentPlayerId: id,
  //     cards,
  //     handKey:'hand'
  //   },
  //   type: 'RECEIVED_CARDS'
  // }

  const _playerReducer = R.flip(R.curryN(2, playerReducer))

  const actual = R.compose(
    // _playerReducer(actionSetName({ id, name: 'kuk' })),
    _playerReducer(actionReciveCards({ id, cards, handKey }))
  )(playerState)

  // const playerState = playerReducer()
  // const playerState = playerReducer(playerState, actionSetName('kuk'))
  // const playerState = playerReducer(playerState, {
  //   type: 'SET_NAME',
  //   payload: { name: 'kuk' }
  // })

  // const playerState = deepFreeze({
  //   id,
  //   cards: {
  //     hand:[],
  //     fd:[],
  //     fu:[]
  //   }
  // })

  // const actual = playerReducer(playerState, action)
  const expected = {
    id,
    cards: {
      hand:['S_3', 'S_5', 'D_10'],
      fd:[],
      fu:[]
    }
  }

  // t.deepEqual({ id: 'expected' }, { id: 'actual' })
  t.true(expected !== actual, 'has to return a new object reference')
  t.deepEqual(expected, actual)
})

// test('RECEIVED_CARDS -- player with no cards recives no cards', t => {
//   // const action = {
//   //   payload: {
//   //     currentPlayerId: id,
//   //     cards:['S_3', 'S_5', 'D_10'],
//   //     handKey:'hand'
//   //   },
//   //   type: 'RECEIVED_CARDS'
//   // }
//   const action = action()
//   action.type = 'RECEIVED_CARDS'
//   action.payload.currentPlayerId = uuid()
//
// })

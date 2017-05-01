const test = require('ava')
const makeMove = require('../lifecycles/makeMove.js')

test('lifecycles/makeMove - exports a function', (t) => {
  t.true(typeof makeMove === 'function')
})

// test('lifecycles/makeMove - selects lowest card in hand when tableStack = []', (t) => {
//   const hand = ['S_10', 'S_5', 'S_2', 'S_7']
//   const tableStack = []
//
//   const actual = makeMove({ tableStack, hand })
//   const expected = ['S_2']
//   t.deepEqual(actual, expected)
// })
// test('lifecycles/makeMove - selects three of a kind', (t) => {
//   const hand = [ 'S_8', 'S_5', 'S_6','S_8', 'S_6', 'S_6', 'S_8']
//   const tableStack = ['C_6']
//
//   const actual = makeMove({ tableStack, hand })
//   const expected = ['S_6', 'S_6', 'S_6']
//   t.deepEqual(actual, expected)
// })

// test('lifecycle/makeMove - returns an [array]', (t) => {
//   t.true()
// })

const test = require('ava')
const R = require('ramda')
const utils = require('../bjonfettaUtils.js')
// function test(label, callback) {
//   const t = { true: () => ...}
//   callback(t)
// }

test('utils.sortHand', t => {
  const hand1 = ['S_3', 'H_14', 'D_10']
  const actual = utils.sortHand(hand1)

  const expected = ['D_10', 'H_14', 'S_3']
  t.deepEqual(actual, expected)
  t.true(!R.equals(actual, hand1))
})


const FIRST_HAND_IS_SMALLER = -1
const FIRST_HAND_IS_GREATER = 1

test('utils.compareHands', t => {
  const hand1 = ['X_2', 'X_3', 'X_10']
  const hand2 = ['X_2', 'X_3', 'X_3']
  const hand3 = ['X_2', 'X_2', 'X_14']

  const testCases = [
    [hand1, hand2, FIRST_HAND_IS_SMALLER],
    [hand1, hand3, FIRST_HAND_IS_GREATER],
    [hand2, hand3, FIRST_HAND_IS_GREATER],
    [hand1, ['X_2', 'X_2'], FIRST_HAND_IS_GREATER],
    [hand1, ['X_2'], FIRST_HAND_IS_GREATER],
    [hand1, [], FIRST_HAND_IS_GREATER],
  ]

  testCases.forEach((testCase) => {
    const [h1, h2, expectedValue] = testCase
    const actual = utils.compareHands(h1, h2)
    t.true(actual === expectedValue)
  })
})

test ('utils.sortPlayers', t => {
  const playerArray = [
    { id: 0, hand: ['X_2', 'X_3', 'X_10'] },
    { id: 1, hand: ['X_2', 'X_3', 'X_3'] },
    { id: 2, hand: ['X_2', 'X_2', 'X_10'] },
    { id: 3, hand: ['X_4', 'X_3', 'X_10'] }
  ]

  const actual = utils.sortPlayers(playerArray)
  const expected = [
    playerArray[2],
    playerArray[0],
    playerArray[1],
    playerArray[3]
  ]

  t.deepEqual(actual, expected)
})

test ('utils.sortString', t => {
  const stringtoSort = "qwertyuiopAasdfghjklzxcvbnm"
  const actual = utils.sortString(stringtoSort)
  const expected = "Aabcdefghijklmnopqrstuvwxyz"
  t.deepEqual(actual, expected)
})

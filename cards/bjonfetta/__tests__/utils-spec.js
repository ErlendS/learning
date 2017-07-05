const test = require('ava')
const R = require('ramda')
const Deck = require('../../deck.js');
const utils = require('../bjonfettaUtils.js')
// function test(label, callback) {
//   const t = { true: () => ...}
//   callback(t)
// }

test('utils.sortHand', t => {
  const hand1 = ['S_3', 'H_14', 'D_10']
  const actual = utils.sortHand(hand1)

  const expected = ['H_14', 'S_3', 'D_10']
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
    [hand1, hand2, FIRST_HAND_IS_GREATER],
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
    { id: 0, cards: {hand: ['X_2', 'X_3', 'X_10'] }},
    { id: 1, cards: {hand: ['X_2', 'X_3', 'X_3'] }},
    { id: 2, cards: {hand: ['X_2', 'X_2', 'X_10']} },
    { id: 3, cards: {hand: ['X_4', 'X_3', 'X_10']} }
  ]

  const actual = utils.sortPlayers(playerArray)
  const expected = [
    playerArray[2],
    playerArray[1],
    playerArray[0],
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

test ('filterHand – lastMove is 3, prevValue is 7', t => {
  const handToFilter = ['S_2', 'H_3', 'E_10', 'E_7']
  const tableStack = [['S_7'], ['D_15'], ['S_15']]
  const actual = utils.filterHand(tableStack, handToFilter)
  const expected = ['S_2','H_3', 'E_7']
  t.deepEqual(actual, expected)
})

test ('filterHand – prevCard is not 7', t => {
  const handToFilter = ['S_2', 'K_3', 'E_10', 'E_7']
  const tableStack = [['S_6']]
  const actual = utils.filterHand(tableStack, handToFilter)
  const expected = ['K_3', 'E_10', 'E_7']
  t.deepEqual(actual, expected)
})
test ('filterHand – tableStack is empty', t => {
  const handToFilter = ['S_2', 'K_3', 'E_10', 'E_7']
  const tableStack = []
  const actual = utils.filterHand(tableStack, handToFilter)
  const expected = ['S_2', 'E_7', 'K_3', 'E_10']
  t.deepEqual(actual, expected)
})

test ('simpleMakeMove – choose S_13', t => {
  const hand = ['H_15', 'E_10', 'E_14','S_13', 'H_13' ]
  const tableStack = ['S_4', 'H_4', 'E_5', 'E_11']
  const actual = utils.simpleMakeMove(tableStack, hand)
  const expected = ['S_13', 'H_13']
  t.deepEqual(actual, expected)
})

test ('simpleMakeMove – choose lowest pair cards', t => {
  const hand = ['S_2', 'H_2', 'E_4', 'E_6']
  const tableStack = ['S_4', 'H_4', 'E_5', 'E_7']
  const actual = utils.simpleMakeMove(tableStack, hand)
  const expected = ['S_2', 'H_2']
  t.deepEqual(actual, expected)
})


test ('simpleMakeMove – no cards', t => {
  const hand = []
  const tableStack = ['S_4', 'H_4', 'E_5', 'E_11']
  const actual = utils.simpleMakeMove(tableStack, hand)
  const expected = []
  t.deepEqual(actual, expected)
})

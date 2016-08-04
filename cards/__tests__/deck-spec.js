const test = require('ava')
const deck = require('../deck.js')

test('deck.generateSuit – generates 13 cards of a suit', t => {
  t.true(deck.generateSuit('S').length === 13)
})

test('deck.generateSuit – generates returns only strings prefixed with the suit', t => {
  const spades = deck.generateSuit('S')
  spades.forEach(card => t.true(card.charAt(0) === 'S'))

  const hearts = deck.generateSuit('H')
  hearts.forEach(card => t.true(card.charAt(0) === 'H'))
})

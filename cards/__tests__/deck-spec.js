const test = require('ava')
const Deck = require('../deck.js')

test('Deck.generateSuit – generates 13 cards of a suit', t => {
  t.true(Deck.generateSuit('S').length === 13)
})

test('Deck.generateSuit – generates returns only strings prefixed with the suit', t => {
  const spades = Deck.generateSuit('S')
  spades.forEach(card => t.true(card.charAt(0) === 'S'))

  const hearts = Deck.generateSuit('H')
  hearts.forEach(card => t.true(card.charAt(0) === 'H'))
})

test('Deck.shuffle – shuffles a deck', t => {
  const originalDeck = Deck.generateDeck()
  const newDeck = Deck.shuffle(originalDeck)
  let i = 0

  newDeck.forEach((card, index) => {
    if (originalDeck[index] === newDeck[index]) {
      i += 1;
    }
  })

  t.true(i < 26, 'this may fail in VERY rare cases, run twice if it does')
})

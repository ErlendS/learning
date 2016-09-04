const Deck = require('./deck.js')
const Players = require('./players.js')

// generate shuffled deck array,
//
let deck = Deck.generateShuffledDeck()
// add n players
//
let players = Players.generatePlayers(4)
// give each player in turn one card
// until deck empty
deck.forEach(function(card, i) {
  let currentplayer = players[i % 4]
  currentplayer.hand.push(card)
})

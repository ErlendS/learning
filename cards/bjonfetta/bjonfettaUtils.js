const R = require('ramda')
const Deck = require('../deck.js')
const CardStack = require('../cardStackFactory.js')


const utils = {}

utils.practicalValue = function practicalValue(value) {
  if (value === 3) return 15
  return value
}

utils.parsePracticalValue = R.compose(
  utils.practicalValue,
  Deck.cardValue
)

utils.compareCards = function compareCards(c1, c2) {
  const [v1, v2] = [c1, c2].map(utils.parsePracticalValue)
  return Deck.compareCardValues(v1, v2)
}

utils.sortHand = R.sort(utils.compareCards)

utils.compareHands = function compareHands(hand1, hand2) {
  if (hand1.length !== hand2.length) {
    const diff = hand1.length - hand2.length
    return diff / Math.abs(diff)
  }

  const h1 = utils.sortHand(hand1)
  const h2 = utils.sortHand(hand2)
  let drawCount = 0
  for (let i = 0; i < h1.length; i++) {

    if (utils.compareCards(h1[i], h2[i]) === -1)  {
      return -1
    }

    if (utils.compareCards(h1[i], h2[i]) === 1)  {
      return 1
    }

    if (utils.compareCards(h1[i], h2[i]) === 0)  {
     drawCount = drawCount + 1
      if (drawCount === 3) {
        return 0
      }
    }
  }
}

utils.comparePlayers = function comparePlayers(player1 ,player2) {
  const p1Hand = player1.hand
  const p2Hand = player2.hand
  return utils.compareHands(p1Hand, p2Hand)
}

utils.sortPlayers = R.sort(utils.comparePlayers)


utils.sortString = R.compose(
  R.join(''),
  R.sort(Deck.compareCardValues)
)


utils.shiftStartIndex = index => R.compose(
    R.flatten,
    R.reverse,
    R.splitAt(index)
)



module.exports = utils

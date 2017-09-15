const R = require('ramda')
const Deck = require('../deck.js')


const utils = {}


utils.repeatEach = R.curryN(2, (items, n) =>
  R.chain(R.repeat(R.__, n), items))


utils.zipWith3 = function zipWith3(xs, ys, zs ) {
  const args = []
  for (let i = 0; i < zs.length; i++) {
    args.push([xs[i], ys[i], zs[i]])
  }
  return args
}


/*
 * flattenPlayer
 * Extracts player out of factory wrapper until rewrite
*/
utils.flattenPlayer = function flattenPlayer (player) {
  return {
    id: player.id,
    hand: player.getHand().getHand('hand')
  }
}


utils.practicalValue = function practicalValue(value) {
  if (value === 3) return 15
  if (value === 10) return 16
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
  const p1Hand = player1.cards.hand
  const p2Hand = player2.cards.hand
  return utils.compareHands(p1Hand, p2Hand)
}

utils.sortPlayers = R.sort(utils.comparePlayers)


utils.sortString = R.compose(
  R.join(''),
  R.sort(Deck.compareCardValues)
)


utils.shiftStartIndex = R.curryN(2, (index, array) =>
  R.compose(
    R.flatten,
    R.reverse,
    R.splitAt(index)
  )(array)
)


const topmostSeries = R.compose(
  // TODO: pro-tip: use R.takeWhile
  R.reduceRight((acc, card) => {
    if (!acc)
      return { currentValue: utils.parsePracticalValue(card), series: [card], rest: [] }
    else if (acc.currentValue === utils.parsePracticalValue(card)) {
      // return Object.assign(acc, { series: [...acc.series, card] })
      acc.series.push(card)
      return acc
    }
    else {
      // return Object.assign(acc, { rest: [...acc.rest, card] })
      acc.rest.push(card)
      return acc
    }
  }, null),
  R.flatten
)


utils.simpleMakeMove = R.curryN(2, (tableStack, hand) =>
  R.compose(
    utils.selectCards,
    utils.sortHand,
    utils.filterHand(tableStack)
  )(hand)
)


const practicallyEquals = R.curryN(2, (a, b) =>
  utils.parsePracticalValue(a) === utils.parsePracticalValue(b)
)

utils.selectCards = function selectCards(hand) {
  const equalsFirstCard = R.compose(practicallyEquals, R.head)(hand)
  return R.takeWhile(equalsFirstCard, hand)
}


utils.filterHand = R.curryN(2, function filterHand(tableStack, hand) {
  const prevCard = R.last(R.flatten(tableStack))
  if (typeof prevCard !== "string") {
    return utils.sortHand(hand)
  }
  const prevCardValue = utils.parsePracticalValue(prevCard)

  if (prevCardValue === 15) {
    return filterHand(R.dropLast(1, tableStack), hand)
  }

  if (prevCardValue !== 7) {
    return R.filter(higherThan(prevCard), hand)
    }

  if (prevCardValue === 7) {
    return R.filter(lowerThanAndIncludesFifteen(prevCard), hand)
  }
})


const higherThan = prevCard => (card) => {
  if (utils.compareCards(card, prevCard) !== -1)  {
    return true
  }
}


const lowerThanAndIncludesFifteen = prevCard => (card) => {
  if (utils.compareCards(card, prevCard) !== 1) {
    return true
  }
  if (utils.parsePracticalValue(card) === 15) {
    return true
  }
}

module.exports = utils

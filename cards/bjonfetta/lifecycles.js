const R = require('ramda');
const utils = require('./bjonfettaUtils');

// lifecycle signature:
// state -> newState

function validateStack(state) {
   const result = R.reduce(function validator(acc, card) {
    if (acc.valid === false) {
      return acc
    }
    if (acc.prevCard !== null && utils.compareCards(acc.prevCard, card) === 0) {
      return Object.assign({}, acc, {
        cardCount: acc.cardCount + 1
      })
    }

    if (acc.mode === 'gt' ) {
      return Object.assign({}, acc, {
        valid: acc.prevCard === null || (acc.cardCount !== 4 && R.not(utils.compareCards(acc.lastValue, card) === 1)),
        lastValue: utils.parsePracticalValue(card) === 15 ? acc.prevCard : card,
        prevCard: card,
        cardCount: acc.cardCount === 4 ? 4 : 1,
        mode: utils.parsePracticalValue(card) === 7 ? 'lt' : 'gt'
      })
    }
    else {
      return Object.assign({}, acc, {
        valid:  (utils.parsePracticalValue(card) === 15 && acc.cardCount !== 4) || (acc.cardCount !== 4 && R.not(utils.compareCards(acc.lastValue, card) === -1)),
        lastValue: utils.parsePracticalValue(card) === 15 ? acc.prevCard : card,
        prevCard: card,
        cardCount: acc.cardCount === 4 ? 4 : 1,
        mode: (utils.parsePracticalValue(card) === 7 || utils.parsePracticalValue(card) === 15) ? 'lt' : 'gt'
      })
    }
  }, {
    valid: true,
    mode: 'gt',
    lastValue: null,
    prevCard: null,
    cardCount: 0
  },  state.tableStack)

  return result.valid
}

module.exports = {
  validateStack
}

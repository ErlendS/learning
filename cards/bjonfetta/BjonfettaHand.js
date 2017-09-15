const R = require('ramda')


function BjonfettaHand() {
  const handState = {
    fd: [],
    fu: [],
    hand: []
  }

  function inspectHand(key) {
      return `${key}: [ ${handState[key].join(', ')} ]`
  }

  return Object.assign  ({
    reciveCards: (cards, key = "hand") => {
      handState[key] = handState[key].concat(cards)

    },
    getHand: (key) => R.clone(handState[key])
    ,
    isEmpty: ()  =>
      handState.fd.length === 0 &&
      handState.fu.length === 0 &&
      handState.hand.length === 0,

    // inspect: () => `{ \n` +
    //   `  fd: [ ${handState.fd.join(', ')} ] \n` +
    //   `  fu: [ ${handState.fu.join(', ')}] \n` +
    //   `  hand [ ${handState.hand.join(', ')}] \n` +
    // `}`,
    inspect: () => `{ \n` +
      `${inspectHand(`fd`)}\n` +
      `${inspectHand(`fu`)}\n` +
      `${inspectHand(`hand`)}\n` +
    `}`,

  })
}


module.exports = BjonfettaHand

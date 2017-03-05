const uuid = require('uuid/v4')
const chalk = require ('chalk')
const CardStack = require('./cardStackFactory.js')
const R = require('ramda')

const randomN = (n) => Math.floor(Math.random() * 1000000) % n

const createPlayer = (name, lifecycles = {}) => {

  if (typeof lifecycles.makeMove !== 'function') {
    throw Error("createPlayer requires makeMove function")
  }

  if (typeof lifecycles.initHand !== 'function') {
    throw Error("createPlayer requires initHand function")
  }


  const playerState = {
    id: uuid(),
    name,
    // hand: CardStack(),
    hand: lifecycles.initHand(),
    roundCache: [],
    }


  return Object.assign({
    id: playerState.id,
    name: playerState.name,

    makeMove: (...args) => lifecycles.makeMove(playerState, ...args),

    getHand: (...args) => R.clone(playerState.hand),

    getName: () => playerState.name,

    printCards: () => {
      console.log(playerState.hand.toString())
    },
    isDone: () => playerState.hand.isEmpty(),

  })
}

module.exports = createPlayer

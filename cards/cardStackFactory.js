// push, pop, get, set, random, sort, insert

const pusher = (state) => ({
  push: (card) => state.stack.push(card),
  append: (cards = []) => {
    state.stack = state.stack.concat(cards)
  }
})

const setter = (state) => ({
  set: (deck) => state.stack = deck
})

const getter = (state) => ({
  getAll: () => state.stack,
  getN: (n) => state.stack.splice(-n, n),
  getAtIndex: (i) => {
    console.log(`Getting card: ${i}`);
    return state.stack.splice(i, 1)
  },
})

const cardStackFactory = (arrayOfCards = []) => {
  const state = {
    stack: arrayOfCards
  }

  return Object.assign(
    {},
    pusher(state),
    // poper(state),
    getter(state),
    setter(state)
    // randomizer(state),
    // sorter(state),
    // inserter(state)
  )
}


module.exports = cardStackFactory

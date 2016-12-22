// push, pop, get, set, random, sort, insert

const popper = (state) => ({
  pop: () => state.stack.pop()
})

const pusher = (state) => ({
  push: (card) => state.stack.push(card),
  concat: (cards = []) => {
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
    popper(state),
    getter(state),
    setter(state)
    // randomizer(state),
    // sorter(state),
    // inserter(state)
  )
}


module.exports = cardStackFactory

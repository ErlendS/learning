const CardStack = require('./cardStackFactory.js')

const randomN = (n) => Math.floor(Math.random() * 1000000) % n

const playerFactory = (name) => {
  const state = {
    name,
    hand: CardStack(),
    }

  return Object.assign(
    {},
    {
      receiveCards: (cards) => {
        state.hand.append(cards)
      },
      makeMove: () => {
        const length = state.hand.getAll().length
        console.log(`Length: ${length}`);

        return state.hand.getAtIndex(randomN(length))
      },
      printCards: () => {
        console.log(state.hand.toString())
      },
      isDone: () => state.hand.getAll().length === 0
    }
  )
}

module.exports = playerFactory

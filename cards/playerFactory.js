const uuid = require('uuid/v4')
const chalk = require ('chalk')
const CardStack = require('./cardStackFactory.js')

const randomN = (n) => Math.floor(Math.random() * 1000000) % n

const playerFactory = (name) => {
  const state = {
    id: uuid(),
    name,
    hand: CardStack(),
    roundCache: [],
    }

  return Object.freeze({
    id: state.id,
    name: state.name,

    receiveCards: (cards) => {
      state.hand.concat(cards)
    },
    makeMove: (gameRound) => {
      if (!state.roundCache[gameRound]) {
        state.roundCache[gameRound] = []
      }

      const currentRoundCache = state.roundCache[gameRound]
      const hand = state.hand.getAll()
      let hasUniqueCards = true
      const isUniqueCard = (card) => currentRoundCache.indexOf(card) === -1
      console.log(chalk.underline(`Attempted cards ${currentRoundCache}`));
      const uniqueCards = hand.filter(isUniqueCard)
      console.log(chalk.underline.magenta(`Players unique cards ----> `+ uniqueCards));
      if (uniqueCards.length === 0) {
        hasUniqueCards = false
      }
      if (hasUniqueCards) {
        const uCard = uniqueCards[randomN(uniqueCards.length)]
        const indexOfuCard = hand.indexOf(uCard)
        const [cardToPlace] = state.hand.getAtIndex(indexOfuCard)
        currentRoundCache.push(cardToPlace)
        console.log(chalk.underline.yellow('CardToPlace -> ' + cardToPlace));
        return [cardToPlace]

        /* TODO:
        returning null forces player to pick one new card
          if he has 0 uniqueCards, reciveOneCard, and add +1
          on cardsRecivedThisRound
          maximum 3 times
          after 3 times on to next player
        */
      }
      console.log(`HAS NO UNIQUE CARDS`);
      return null
    },
    getHand: () => state.hand.getAll(),

    printCards: () => {
      console.log(state.hand.toString())
    },
    isDone: () => state.hand.getAll().length === 0
  })
}

module.exports = playerFactory

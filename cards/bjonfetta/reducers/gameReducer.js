const redux = require('redux')
// const makeMove = require('./lifecycles/makeMove')
const playerReducer = require('./playerReducer.js')


// const gameReducer = redux.combineReducers({
//   players: playersReducer,
//   tableStack: tableStackReducer,
// })


function gameReducer (game, action) {
  return Object.assign({}, game, {
    players: game.players.map(player => playerReducer(player, action)),
    tableStack: tableStackReducer(game, action)
  })
}

module.exports = gameReducer

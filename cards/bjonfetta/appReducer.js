const redux = require('Redux');
const { reducer: tableStack } = require('./modules/tableStack');
const { reducer: players } = require('./modules/player');
const { reducer: deck } = require('./modules/deck')

const { combineReducers } = redux

const appReducer = combineReducers({
  tableStack,
  players,
  deck,
})


module.exports = appReducer

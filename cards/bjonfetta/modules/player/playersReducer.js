const R = require('Ramda');
const playerReducer = require('./playerReducer');
const {
  CREATE_PLAYER
} = require('./playerActions')



const playersReducer = (playersState = {}, action = {}) => {
  const { payload = {} } = action

  if (action.type === CREATE_PLAYER && payload.id) {
    const { id } = payload
    const player = Object.assign(playerReducer(), { id }) // add/overwrite id
    return R.assoc(id, player, playersState)
  }

  const playerId = payload.currentPlayerId
  if (playerId && playersState[playerId]) {
    return Object.assign({}, playersState, {
      [playerId]: playerReducer(playersState[playerId], action)
    })
  }

  return playersState
}

module.exports = playersReducer

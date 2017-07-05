// const _exports = {}
const MAKE_MOVE = 'player/MAKE_MOVE'
const RECEIVE_CARDS = 'player/RECEIVE_CARDS'
const CREATE_PLAYER = 'player/CREATE_PLAYER'

const actionCreatePlayer = ({ id }) => {
  return {
    payload: {
      id,
    },
    type: CREATE_PLAYER
  }
}

// _exports.actionMakeMove = actionMakeMove

function actionMakeMove({id, move, handKey})  {
  return {
    payload: {
      currentPlayerId: id,
      move,
      handKey
    },
    type: MAKE_MOVE
  }
}

function actionReciveCards({ id, cards, handKey}) {
  return {
      payload: {
        currentPlayerId: id,
        cards,
        handKey
      },
      type: RECEIVE_CARDS
  }
}
// module.exports = _exports
module.exports = {
  MAKE_MOVE,
  RECEIVE_CARDS,
  CREATE_PLAYER,
  actionCreatePlayer,
  actionReciveCards,
  actionMakeMove
}

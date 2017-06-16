
function actionAddCards({ cards }) {
  return {
    payload: { cards },
    type: 'ADD_CARDS'
  }
}

function actionRemoveCards({ cards }) {
  return {
    payload: { cards },
    type: 'REMOVE_CARDS'
  }
}

module.exports = {
  actionRemoveCards,
  actionAddCards
}

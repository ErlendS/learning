const ADD_TO_DECK = 'deck/ADD_CARDS'
const REMOVE_FROM_DECK = 'deck/REMOVE_FROM_DECK'
const SET_DECK = 'deck/SET_DECK'


const addToDeck = ({ cards }) => {
  return {
    payload: { cards },
    type: ADD_TO_DECK
  }
}


const removeFromDeck = ({ cards }) => {
  return {
    payload: { cards },
    type: REMOVE_FROM_DECK
  }
}


const setDeck = ({ deck }) => {
  return {
    payload:  { deck },
    type: SET_DECK
  }
}


module.exports = {
  ADD_TO_DECK,
  REMOVE_FROM_DECK,
  SET_DECK,
  removeFromDeck,
  addToDeck,
  setDeck,

}

const R = require('ramda')


const SUIT_ORDER = ['S', 'C', 'H', 'D']

// lag en funksjon som genererer array med 52 string values som en vanlig kortstokk.

function generateSuit(suitType) {
  const suitArray = [];
  for (var i = 2; i <= 14; i++) {
     suitArray.push(suitType + "_" + i)
  }
  return suitArray;
}

function generateDeck() {
  let deck = [];
  const suits = SUIT_ORDER
  for (var i = 0; i < 4; i++) {
      deck = deck.concat(generateSuit(suits[i]))
  }
  return deck;
}

 // omplasser to tilfeldige verdier i deck arrayen 15000 ganger
 function shuffle(_deck) {
   const deck = R.clone(_deck)

   // velg et tilfeldig tall mellom 0-51
   function positionInArray() {
     return Number.parseInt(Math.random() * 1000000 % 52)
   }
   for(var i = 0; i < 15000; i++) {
     let firstPosition = positionInArray()
     let secondPosition = positionInArray()
     let anyCard = deck[firstPosition]
     deck[firstPosition] = deck[secondPosition]
     deck[secondPosition] = anyCard
   }
   return deck;
 }


function insertIntoSortedArray(x, sortedArray, compareFn) {
  // sammenligner x mot sortedArray og legger x inn i sortedArray
  if (sortedArray.length === 0) {
    sortedArray.push(x)
    return sortedArray
  }

  let done = false
  for (let i = 0; i < sortedArray.length; i++) {
    if (compareFn(sortedArray[i], x) === 1 || compareFn(sortedArray[i], x) === 0) {
      sortedArray.splice(i, 0, x)
      done = true
      break
    }
  }
  if (!done) {
    sortedArray.push(x)
  }
  return sortedArray
}

function createSortFn(compareFn) {
  return function sort(deck) {
    let currentCard = deck[0]
    let newDeck = []
    for (let i = 0; i < deck.length; i++) {
      currentCard = deck[i]
      newDeck = insertIntoSortedArray(currentCard, newDeck, compareFn)
    }
    return newDeck
  }
}

function cardValue(card) {
  const [suit, value] = card.split("_")
  return Number.parseInt(value, 10)
}

function cardSuit(card) {
    const [suit] = card.split("_")
    return suit
}

function compareCardValues (card1, card2) {
  const v1 = cardValue(card1)
  const v2 = cardValue(card2)
  if (v1 > v2 ) {
    return 1
  }
  if (v1 == v2) {
    return 0
  }
  if (v1 < v2) {
    return -1
  }
}


 module.exports = {
   generateDeck,
   generateSuit,
   shuffle,
   cardValue,
   createSortFn,
   compareCardValues,
 }

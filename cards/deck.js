// Lag en kortstokk!

// lag en funksjon som genererer array med 52 string values som en vanlig kortstokk.

function generateSuit(suitType) {
  const suitArray = [];
  for (var i = 2; i <= 14; i++) {
     suitArray.push(suitType + "_" + i)
  }
  return suitArray;
}

function generateCards() {
  let deck = [];
  const suits = "SCHD"
  for (var i = 0; i < 4; i++) {
      deck = deck.concat(generateSuit(suits.charAt(i)))
  }
  return deck;
}

 module.exports = {
   generateCards,
   generateSuit,
 }

// Lag en kortstokk!

// lag en funksjon som genererer array med 52 string values som en vanlig kortstokk.

// Steg 1 -- BE A BOSS PLAYA
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


 console.log(generateCards())


 module.exports = {
   generateCards,
   generateSuit,
 }

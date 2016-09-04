// create players, deal cards,
// generate players,

function generatePlayers(x) {
  let arrayOfPlayers = []
  for (i = 1; i <= x; i++) {
     let playerX = {
      id: 'player' + i,
      hand: []
    }
    arrayOfPlayers.push(playerX)
  }
  return arrayOfPlayers
}

module.exports = {
  generatePlayers,
}

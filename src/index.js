const path = require('path')
const publicDirPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const gamesRouter = require('./routers/games')

app.use(express.static(publicDirPath))

app.use(express.json())
app.use(gamesRouter)

const HardGame = require('./models/hardGame')

require('./db/mongoose')

const Sudoku = require('./sudoku.js')

function calcGame() {

  //Initialize empty boards
  let game = new Sudoku(9)
  let c
  do {
    game.generateBoard()
    game.hideNumbers(0.4)
    c = game.countSolutions(0)
    console.log(`Number of solutions: ${c}`)
  }
  while (c > 1)

  //printScreen(game.hiddenMat,game.size)

  return { mat: game.mat, hiddenMat: game.hiddenMat, size: game.size }

}

async function fillGames() {

  try {
    let games = await HardGame.find({})
    while (games.length != 100) {
      let mat = calcGame()

      const game = new HardGame({ matrix: mat.mat, hiddenMatrix: mat.hiddenMat, size: mat.size })
      await game.save()
      games = await HardGame.find({})
      console.log(games)

    }

  }
  catch (e) {
    console.log(e)
  }
}

fillGames()


app.listen(port, () => {
  console.log('Server is up')
})



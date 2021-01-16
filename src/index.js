const path = require('path')
const publicDirPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000

const express = require('express')
const app = express()
const gamesRouter = require('./routers/games')

app.use(express.static(publicDirPath))

app.use(express.json())
app.use(gamesRouter)

const HardGame = require('./models/hardGame')

require('./db/mongoose')

async function fillGames() {

  try {
    let games = await HardGame.find({})
    while (games.length!=10) {
      let mat = calcGame()
      
      const game = new HardGame({matrix:mat.mat,hiddenMatrix:mat.hiddenMat,size:mat.size})
      await game.save()
      games = await HardGame.find({})

    }

  }
  catch (e) {
    console.log(e)
  }
}

//fillGames()


app.listen(port, ()=> {
    console.log('Server is up')
})



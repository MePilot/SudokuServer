const express = require('express')
const router = new express.Router()
const Sudoku = require('../sudoku.js')
const HardGame = require('../models/hardGame')
/* 
router.get('/hard1Game', function(req, res) {
    console.log('REQUEST')
    
    
    
  });
*/

  router.get('/sudoku', function(req, res) {
    console.log('REQUEST')
    
    if(req.query.game) {

        const params=req.query.game.split(':')

        let size = params[0]
        let diff = params[1]

        let game = new Sudoku(size)
        let solutions

        if(Number(diff)==0.35 && size==9) {

            HardGame.findOneRandom(function(err, result) {
                if (!err) {
                    res.send(result)
                }
        
              });
            }
            else {
                do {

                    game.generateBoard()
                    game.hideNumbers(diff)
                    solutions = game.countSolutions(0)
                    console.log(`Number of solutions: ${solutions}`)
                }
        
                while(solutions>1)
                res.send({matrix:game.matrix, hiddenMatrix:game.hiddenMat,size:game.size})
            }
        
        console.log(req.query.game)
        console.log(size, diff)
      
    }
})

  module.exports = router